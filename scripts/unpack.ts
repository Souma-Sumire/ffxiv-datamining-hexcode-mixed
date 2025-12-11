import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import AppConfig from "../config.json";

const availableLangs = ["chs", "en", "ja", "tc"] as const;
type AvailableLang = (typeof availableLangs)[number];

const getServer = (lang: AvailableLang) => {
  switch (lang) {
    case "chs":
      return "chs";
    case "en":
      return "global";
    case "ja":
      return "global";
    case "tc":
      return "tc";
    default:
      throw new Error("未知的语言参数");
  }
};

const unpack = (lang: AvailableLang) => {
  if (!lang || !availableLangs.includes(lang)) {
    console.error(`请提供合法的运行参数。\n示例：\n> ts-node scripts/unpack.ts [${availableLangs.join("|")}]`);
    process.exit(1);
  }

  const server = getServer(lang);
  const gamePath = AppConfig.gamePath[server];
  if (!fs.existsSync(gamePath)) {
    console.error(`未找到 ${lang} 的游戏路径，请先配置 config.json 文件。\n gamePath: ${gamePath}`);
    process.exit(1);
  }

  const unpackerPath = path.resolve("tools/unpacker/DumpCsv.exe");
  if (!fs.existsSync(unpackerPath)) {
    console.error(`未找到 unpacker 执行文件。请运行 package.json 中的 update-unpacker 脚本。\n unpackerPath: ${unpackerPath}`);
    process.exit(1);
  }

  const outputPath = `../../${lang}`;
  fs.mkdirSync(outputPath, { recursive: true });

  console.log(`开始进行 ${lang} 的解包...`);
  execSync(`"${unpackerPath}" "${gamePath}" ${lang} rawexd "${outputPath}"`, { stdio: "inherit", cwd: path.dirname(unpackerPath) });
};

const server = process.argv[2] as AvailableLang;
unpack(server);
