import fs from "fs"
import path from "path"
import fetch from "node-fetch"
import AdmZip from "adm-zip"

const unpackerDir = path.resolve("tools/unpacker")
const versionFile = path.join(unpackerDir, "version.json")

interface VersionInfo {
  [repo: string]: string // repoName -> tag_name
}

const repos = [
  {
    name: "dumpcsv",
    owner: "Souma-Sumire",
    repo: "dumpcsv",
    asset: "DumpCsv.zip",
  },
  {
    name: "saintcoinach",
    owner: "Souma-Sumire",
    repo: "SaintCoinach-hexcode",
    asset: "SaintCoinach.Cmd.zip",
  },
]

async function getLatestRelease(owner: string, repo: string) {
  const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`ERROR: Failed to get latest release of ${repo}.\nResponse:\n${res.status}`)
  return res.json() as any
}

async function downloadFile(url: string, dest: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`ERROR: Failed to download file from ${url}.`)
  const fileStream = fs.createWriteStream(dest)
  await new Promise<void>((resolve, reject) => {
    res.body?.pipe(fileStream)
    res.body?.on("error", reject)
    fileStream.on("finish", resolve)
  })
}

async function updateRepo(r: typeof repos[number], localVersions: VersionInfo) {
  const release = await getLatestRelease(r.owner, r.repo)
  const latestTag = release.tag_name

  if (localVersions[r.name] === latestTag) {
    console.log(`SKIPPED: Already latest for ${r.repo} (${latestTag}).`)
    return
  }

  const asset = release.assets.find((a: any) => a.name === r.asset)
  if (!asset) throw new Error(`ERROR: Failed to found ${r.asset} from ${r.repo}.`)

  const zipPath = path.join(unpackerDir, r.asset)

  console.log(`⬇️ Downloading ${r.repo} ${latestTag} ...`)
  const downloadUrl = 'https://ghfast.top/' + asset.browser_download_url
  await downloadFile(downloadUrl, zipPath)

  console.log(`📦 Extracting ${r.asset} ...`)
  const zip = new AdmZip(zipPath)
  zip.extractAllTo(unpackerDir, true)

  fs.unlinkSync(zipPath)
  console.log(`🧹 Cleaned ${r.asset}.`)

  localVersions[r.name] = latestTag
}

async function main() {
  fs.mkdirSync(unpackerDir, { recursive: true })
  let localVersions: VersionInfo = {}

  if (fs.existsSync(versionFile)) {
    localVersions = JSON.parse(fs.readFileSync(versionFile, "utf-8"))
  }

  for (const r of repos) {
    await updateRepo(r, localVersions)
  }

  fs.writeFileSync(versionFile, JSON.stringify(localVersions, null, 2))
  console.log("✨ Unpacker updated successfully!")
}

main().catch((err) => {
  console.error("❌ Failed to update unpacker: ", err)
  process.exit(1)
})
