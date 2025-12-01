# 旅ガチャ (Trip Roulette App)

友達と旅行先をルーレットで決められる楽しいアプリ。
国内の都道府県や市町村をランダムに選択し、SNSでシェアできます。

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## 主要機能

- **4種類のルーレット**:
  - 全国（都道府県）: 47都道府県からランダム選択
  - 全国（市町村）: 全国の市町村からランダム選択
  - 地方別（市町村）: 特定の地方の市町村から選択
  - 都道府県内（市町村）: 特定の都道府県内の市町村から選択

- **滑らかなアニメーション**: react-native-reanimatedによる60FPS以上のルーレット回転
- **SNSシェア機能**: 結果を簡単にシェア
- **ダークモード対応**: ライト・ダークモードの両方をサポート
- **マルチプラットフォーム**: iOS、Android、Webに対応

## Get started

1. 依存関係のインストール

   ```bash
   npm install
   ```

2. 開発サーバーの起動

   ```bash
   npx expo start
   ```

3. アプリの起動

   開発サーバー起動後、以下のオプションから選択:
   - **Android**: `a` キーを押す、または `npm run android`
   - **iOS**: `i` キーを押す、または `npm run ios`
   - **Web**: `w` キーを押す、または `npm run web`
   - **Expo Go**: QRコードをスキャン

## プロジェクト構造

```
trip-spin/
├── app/                    # 画面ファイル (Expo Router)
│   ├── (tabs)/            # タブナビゲーション
│   │   └── index.tsx     # ホーム画面
│   ├── roulette-select.tsx   # ルーレット選択画面
│   ├── region-select.tsx     # 地方選択画面
│   ├── prefecture-select.tsx # 都道府県選択画面
│   ├── roulette.tsx          # ルーレット実行画面
│   └── result.tsx            # 結果表示画面
├── components/            # 再利用可能なコンポーネント
│   ├── Button.tsx         # 共通ボタン
│   ├── RouletteCard.tsx   # カードコンポーネント
│   └── RouletteWheel.tsx  # ルーレットホイール
├── constants/             # 定数
│   ├── theme.ts          # カラーテーマ
│   └── regions.ts        # 地方区分
├── data/                  # データファイル
│   ├── prefectures.json  # 47都道府県
│   └── cities.json       # 市町村データ
├── types/                 # TypeScript型定義
├── utils/                 # ユーティリティ関数
└── docs/                  # 開発チケット
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
