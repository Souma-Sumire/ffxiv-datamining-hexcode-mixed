# ffxiv-datamining-mixed

複数の言語／クライアントの FF14 CSV 抽出データを同時に提供するリポジトリです。 <br>
フォーマットは [xivapi/ffxiv-datamining](https://github.com/xivapi/ffxiv-datamining) と同一ですが、複数言語版をまとめて扱える点が特徴です。  
中国版7.25／グローバル版7.31 以降のデータを提供しています。


## 使い方

### 抽出データの取得

リポジトリのルートにある以下のフォルダに CSV 抽出ファイルが配置されています：
| ディレクトリ  | サーバー |   言語   |
| :---: | :----: | :------: |
| `chs` |  中国版  | 簡体字中国語 |
| `en`  | グローバル版 |   英語   |
| `ja`  | グローバル版 |   日本語   |

GitHub 上で直接 CSV を閲覧できますが、ファイルサイズが大きいため読み込みが重くなる場合があります。基本的には [リポジトリの ZIP をダウンロード](https://github.com/InfSein/ffxiv-datamining-mixed/archive/refs/heads/master.zip) 。 <br>
更新内容を確認したい場合は [コミットログ](https://github.com/InfSein/ffxiv-datamining-mixed/commits/master/) を参照してください。

基本的に、ゲームのパッチアップデート後に SaintCoinach が更新され次第、可能な限り速やかに抽出データを更新していますが、遅れることもあります。  
もし更新が間に合わない場合や、ローカルで抽出したい場合は、以下の手順を参考にしてください。

## ローカルでの抽出方法

本プロジェクト自体は抽出ツールです。  
[xivapi/SaintCoinach](https://github.com/xivapi/SaintCoinach) をベースにした [thewakingsands/dumpcsv](https://github.com/thewakingsands/dumpcsv) を利用しており、構成の都合により改変版の **[InfSein/dumpcsv](https://github.com/InfSein/dumpcsv)** を使用しています。

ローカル環境のゲームデータから CSV を抽出するには、以下がインストールされている必要があります：
*  `.NET 7 Runtime` 及び `NodeJS (22.x推奨)`

そして以下の手順で操作する：
1. 本リポジトリをダウンロードまたは clone する；
2. プロジェクトディレクトリでターミナルを開き、 `npm i` を実行；
3. ルートにある `config.json.example` をコピーし `config.json` として保存  <br>
   中国版／グローバル版のゲームパスを記入；
   > もし抽出したくないサーバーがある場合、そのパスは空のままで構いません。
4.  `npm run update-unpacker` を実行し、抽出ツールを更新。
5. 必要に応じて以下のコマンドを実行して抽出。
   | コマンド              | 説明                                          |
   | :------------------- | :------------------------------------------- |
   | `npm run unpack:chs` | 中国版テキストを抽出し、簡体字 CSV を `chs` に出力 |
   | `npm run unpack:en`  | グローバル版テキスト（英語）を `en` に出力    |
   | `npm run unpack:ja`  | グローバル版テキスト（日本語）を `ja` に出力    |
初回抽出は以上で完了します。  
2 回目以降の抽出は手順 4 から実行すれば問題ありません。

#### 更新への協力

ローカルで抽出を完了しており、こちらの更新が遅れている場合、**[Pull Request](https://github.com/InfSein/ffxiv-datamining-mixed/pulls)** を送っていただけると助かります。 <br>
その際、以下の点を守ってください：
* 抽出フォルダ以外のファイルを不用意に変更しない  
* 言語ごとに 1 コミットにまとめる 
  > 例：グローバル版で抽出し en と ja が更新された場合 <br>
  > その際には2 コミットに分けること `data: グローバル版xxx／英語` 和 `data: グローバル版xxx／日本語` 。 <br>
* コミットメッセージは下記形式を推奨
  ```
  # 中国版の例
  [タイトル] data: 中国版7.31
  [本文] CHS 2025.09.03.0000.0000
  # グローバル版の例
  [タイトル] data: グローバル版7.31／日本語
  [本文] GLOBAL 2025.09.03.0000.0000
  ```
不適切な PR は修正されるか、クローズされる場合があります。

## プロジェクト構成
```
ffxiv-datamining-mixed
├── scripts
│   ├── unpack.ts          # 抽出実行スクリプト
│   └── update-unpacker.ts # 抽出ツール更新スクリプト
├── tools
│   └── unpacker           # 抽出ツール
├── config.json            # ローカル設定
└── config.json.example    # 設定サンプル
```
