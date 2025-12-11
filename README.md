# ffxiv-datamining-hexcode-mixed

复刻自 [InfSein/ffxiv-datamining-mixed](https://github.com/InfSein/ffxiv-datamining-mixed)，但输出 hexcode 格式，以供汉化工具使用。

从 国服7.38／国际服7.38／繁中服7.0 开始提供。

## 本地解包

为了项目结构需要，此项目实际使用的是复刻／修改后的：

- [Souma-Sumire/dumpcsv](https://github.com/Souma-Sumire/dumpcsv)
- [Souma-Sumire/SaintCoinach-hexcode](https://github.com/Souma-Sumire/SaintCoinach-hexcode)

如果想要从本地的游戏文件中提取出csv文件，请确保：

- 已安装 `.NET 7 运行时` 和 `NodeJS (推荐22.x)`

然后，按照以下步骤操作：

1. 下载或clone此项目；
2. 在项目目录下打开终端，执行 `npm i` ；
3. 将项目根目录下的 `config.json.example` 复制一份，重命名为 `config.json`，然后在其中相应的位置填写你国服／国际服／繁中服的游戏目录；
   > 如果你不需要解包某些服务器的文本，则不需要填写其目录，在后续步骤中不执行对应解包指令即可。
4. 在终端执行 `npm run update-unpacker` ，更新解包工具；
5. 按需执行以下解包指令。

   | 解包指令              | 说明                                          |
   | :------------------- | :------------------------------------------- |
   | `npm run unpack:chs` | 解包国服文本，输出简体中文的csv到 `chs` 目录下。 |
   | `npm run unpack:en`  | 解包国际服文本，输出英文的csv到 `en` 目录下。    |
   | `npm run unpack:ja`  | 解包国际服文本，输出日文的csv到 `ja` 目录下。    |
   | `npm run unpack:tc`  | 解包繁中服文本，输出繁体中文的csv到 `tc` 目录下。    |

如此即可完成初次解包。
在初次解包之后，下次及之后的解包可以直接从第4步开始。
