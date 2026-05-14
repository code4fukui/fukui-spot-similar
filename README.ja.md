# fukui-spot-similar

福井県の観光地について、説明文の意味的な類似性に基づき、似ているスポットと似ていないスポットを見つけるウェブアプリケーションです。

## デモ

**[https://code4fukui.github.io/fukui-spot-similar/](https://code4fukui.github.io/fukui-spot-similar/)**

メインとなる観光地を表示し、それに最も似ているスポットと似ていないスポットの上位3件をそれぞれリストアップすることで、興味深い発見を提供します。

## 特徴

- OpenAIの`text-embedding-ada-002`モデルを使用して、観光地の日本語説明文を分析します。
- コサイン類似度を計算し、各スポットに対して最も似ているスポットと似ていないスポットの上位3件を特定します。
- シンプルで画像が豊富なウェブインターフェースで結果を表示します。
- データセットからランダムに選ばれた背景画像を表示する動的なヘッダーを備えています。

## 動作原理

このプロジェクトは、静的ウェブサイト上で高速に結果を表示するために、事前計算アプローチを採用しています。データ処理は2段階のスクリプトで行われます。

1. **ベクトル生成 (`make_vec_fukuispot.js`):** オープンデータソースから観光地の説明文を取得し、OpenAI APIを使用して数値ベクトル（埋め込み）に変換します。結果は`fukui-spot_vec.csv`に保存されます。
2. **類似度計算 (`calc_vec_fukuispot.js`):** すべてのスポットベクトルのペア間でコサイン類似度を計算します。各スポットについて、最も似ている（類似度スコアが最も高い）上位3件と、最も似ていない（類似度スコアが最も低い）上位3件を特定します。この事前計算されたデータは`fukui-spot_vec_similar.csv`に保存されます。
3. **フロントエンド表示 (`index.html`):** 静的なウェブページが最終的な`fukui-spot_vec_similar.csv`を読み込み、事前計算された関係性を表示します。ブラウザ上でのAPI呼び出しや重い計算は行われません。

## セットアップ

ローカルでデータを再生成するには、以下の手順に従ってください。

### 必須条件

- [Deno](https://deno.land/) ランタイム
- [OpenAI APIキー](https://platform.openai.com/api-keys)

### 手順

1. リポジトリをクローンします。
2. ルートディレクトリに`.env`ファイルを作成し、OpenAI APIキーを追加します。
    ```
    OPENAI_API_KEY=sk-...
    ```
3. データ処理スクリプトを実行します。これにより、最新のデータが取得され、新しいベクトル埋め込みが生成され、類似度が計算されます。
    ```bash
    deno run -A make.js
    ```
    *(注: より安全なアプローチとして、特定のフラグを使用することもできます: `deno run --allow-net --allow-read --allow-write --allow-env make.js`)*
4. ウェブブラウザで`index.html`を開き、結果を確認します。

## データソース

- **観光地データ:** [福井観光オープンデータ](https://github.com/code4fukui/fukui-spot) （データ提供: [ふくいドットコム](https://www.fuku-e.com/)、CC BYライセンス）
- **テキストベクトル化:** OpenAIの`text-embedding-ada-002`モデルを使用する [txt2vecライブラリ](https://github.com/code4fukui/txt2vec)

## ライセンス

MIT License
