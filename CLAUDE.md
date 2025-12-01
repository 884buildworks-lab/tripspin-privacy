# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trip-spin is a React Native mobile application built with Expo and Expo Router. It uses file-based routing and supports iOS, Android, and web platforms with React Native's new architecture enabled.

## Development Commands

### Starting Development
```bash
npm install              # Install dependencies
npx expo start          # Start the Expo development server
npm run android         # Start on Android emulator
npm run ios             # Start on iOS simulator
npm run web             # Start web version
```

### Code Quality
```bash
npm run lint            # Run ESLint
```

### Project Reset
```bash
npm run reset-project   # Move starter code to app-example/ and create blank app/
```

## Architecture

### Routing Structure
- Uses **Expo Router** with file-based routing
- Root layout: `app/_layout.tsx` - Configures navigation theme, Stack navigator, and StatusBar
- Tab navigation: `app/(tabs)/_layout.tsx` - Bottom tabs with Home and Explore screens
- Modal screens: `app/modal.tsx` - Presented modally
- Anchor setting: Root layout uses `unstable_settings.anchor = '(tabs)'` to set initial route

### Theming System
- Color scheme detection via `hooks/use-color-scheme.ts`
- Theme colors defined in `constants/theme.ts` with light/dark variants
- Themed components: `ThemedText` and `ThemedView` automatically adapt to color scheme
- Uses `@react-navigation/native` theme provider for navigation theming
- `useThemeColor` hook: Resolves colors based on current scheme with optional overrides

### Component Architecture
- **Themed components** (`components/themed-*.tsx`): Accept `lightColor` and `darkColor` props for theme overrides
- **UI components** (`components/ui/`): Platform-specific components (e.g., `icon-symbol.ios.tsx`)
- **Haptic feedback**: Tab navigation uses `HapticTab` wrapper for native haptics
- Path alias: `@/*` resolves to root directory

### Platform Configuration
- **iOS**: Supports tablets, uses SF Symbols via `expo-symbols`
- **Android**: Adaptive icon with background/foreground/monochrome images, edge-to-edge UI enabled
- **Web**: Static output, favicon configured
- **Splash screen**: Configured via plugin with light/dark variants
- **Scheme**: Deep linking enabled with `tripspin://` URL scheme

### Key Features Enabled
- TypeScript with strict mode
- Typed routes (Expo Router experimental feature)
- React Compiler (experimental)
- React Native Reanimated for animations
- Gesture handler for touch interactions

## TypeScript Configuration
- Extends `expo/tsconfig.base`
- Path alias `@/*` maps to project root
- Strict mode enabled

---

# 旅ガチャ (Trip Roulette App)

## プロジェクト概要

大学生などの友達グループが、旅行先をルーレットで決められる楽しいアプリ。
国内の都道府県や市町村をランダムに選択し、SNSでシェアできる。

**ターゲット**: 大学生を中心とした若年層の友達グループ
**スコープ**: 国内限定（都道府県・市町村）
**プラットフォーム**: iOS / Android / Web (React Native / Expo)

---

## 技術スタック

- **フレームワーク**: React Native (Expo)
- **言語**: TypeScript
- **アニメーション**: react-native-reanimated
- **SNSシェア**: expo-sharing
- **ナビゲーション**: expo-router または @react-navigation/native
- **状態管理**: React Hooks (useState, useContext)

---

## プロジェクト構造

```
trip-roulette/
├── app/                      # Expo Router使用時の画面
│   ├── index.tsx            # ホーム画面
│   ├── roulette-select.tsx  # ルーレット選択画面
│   ├── region-select.tsx    # 地方選択画面
│   ├── prefecture-select.tsx # 都道府県選択画面
│   ├── roulette.tsx         # ルーレット実行画面
│   └── result.tsx           # 結果表示画面
├── components/
│   ├── RouletteWheel.tsx    # ルーレット本体コンポーネント
│   ├── ResultCard.tsx       # 結果表示カード
│   └── Button.tsx           # 共通ボタン
├── data/
│   ├── prefectures.json     # 都道府県データ
│   └── cities.json          # 市町村データ
├── types/
│   └── index.ts             # TypeScript型定義
├── utils/
│   ├── rouletteLogic.ts     # ルーレットロジック
│   └── shareUtils.ts        # SNSシェアユーティリティ
├── constants/
│   └── regions.ts           # 地方区分定数
├── package.json
├── tsconfig.json
└── app.json
```

---

## 主要機能

### 1. ルーレットタイプ

4種類のルーレットを実装：

1. **全国（都道府県）**: 47都道府県からランダム選択
2. **全国（市町村）**: 全国約1,700市町村からランダム選択
3. **地方別（市町村）**: 特定の地方の市町村からランダム選択
4. **都道府県内（市町村）**: 特定の都道府県内の市町村からランダム選択

### 2. 地方区分

```typescript
const REGIONS = {
  hokkaido: '北海道',
  tohoku: '東北',
  kanto: '関東',
  chubu: '中部',
  kinki: '近畿',
  chugoku: '中国',
  shikoku: '四国',
  kyushu: '九州・沖縄'
};
```

### 3. 画面遷移フロー

```
ホーム画面
  → ルーレット選択画面
    → (地方別の場合) 地方選択画面
    → (都道府県内の場合) 都道府県選択画面
  → ルーレット実行画面
  → 結果表示画面
    → (もう一度回す) ルーレット選択画面へ
```

---

## データ構造

### 都道府県データ (prefectures.json)

```json
[
  {
    "id": 1,
    "name": "北海道",
    "region": "hokkaido",
    "description": "日本最北の大地"
  },
  {
    "id": 13,
    "name": "東京都",
    "region": "kanto",
    "description": "日本の首都"
  }
]
```

### 市町村データ (cities.json)

```json
[
  {
    "id": 1,
    "name": "札幌市",
    "prefecture_id": 1,
    "prefecture_name": "北海道",
    "region": "hokkaido",
    "description": "北海道の中心都市"
  },
  {
    "id": 100,
    "name": "千代田区",
    "prefecture_id": 13,
    "prefecture_name": "東京都",
    "region": "kanto",
    "description": "東京の中心地"
  }
]
```

---

## TypeScript型定義

```typescript
// types/index.ts

export type RouletteType =
  | 'prefecture-all'      // 全国（都道府県）
  | 'city-all'           // 全国（市町村）
  | 'city-region'        // 地方別（市町村）
  | 'city-prefecture';   // 都道府県内（市町村）

export type RegionKey =
  | 'hokkaido'
  | 'tohoku'
  | 'kanto'
  | 'chubu'
  | 'kinki'
  | 'chugoku'
  | 'shikoku'
  | 'kyushu';

export interface Prefecture {
  id: number;
  name: string;
  region: RegionKey;
  description: string;
}

export interface City {
  id: number;
  name: string;
  prefecture_id: number;
  prefecture_name: string;
  region: RegionKey;
  description: string;
}

export interface RouletteResult {
  name: string;
  description: string;
  type: 'prefecture' | 'city';
  prefecture_name?: string; // 市町村の場合のみ
}
```

---

## 実装の重要ポイント

### 1. ルーレットアニメーション

- **使用ライブラリ**: `react-native-reanimated`
- **要件**: 60FPS以上を維持
- **回転時間**: 3〜5秒
- **動き**: 徐々に減速するイージング

```typescript
// 実装イメージ
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

const rotation = useSharedValue(0);

const startRoulette = () => {
  rotation.value = withTiming(
    rotation.value + 360 * 5 + Math.random() * 360,
    {
      duration: 4000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1)
    }
  );
};
```

### 2. SNSシェア機能

- **使用ライブラリ**: `expo-sharing`
- **シェア内容**:
  - テキスト: 「旅ガチャで〇〇に決まりました！ #旅ガチャ」
  - 画像: 結果画面のスクリーンショット（オプション）

```typescript
import * as Sharing from 'expo-sharing';

const shareResult = async (result: RouletteResult) => {
  const message = `旅ガチャで${result.name}に決まりました！ #旅ガチャ`;

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(message);
  }
};
```

### 3. データの読み込み

```typescript
// utils/dataLoader.ts
import prefecturesData from '../data/prefectures.json';
import citiesData from '../data/cities.json';

export const getPrefectures = (): Prefecture[] => {
  return prefecturesData;
};

export const getCitiesByRegion = (region: RegionKey): City[] => {
  return citiesData.filter(city => city.region === region);
};

export const getCitiesByPrefecture = (prefectureId: number): City[] => {
  return citiesData.filter(city => city.prefecture_id === prefectureId);
};
```

---

## 開発手順

### Phase 1: プロジェクトセットアップ

```bash
# Expoプロジェクト作成
npx create-expo-app trip-roulette --template blank-typescript

# 必要なパッケージインストール
cd trip-roulette
npx expo install react-native-reanimated expo-sharing
npx expo install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context
```

### Phase 2: データ準備

1. `data/prefectures.json` 作成（47都道府県データ）
2. `data/cities.json` 作成（主要市町村データ）
   - 初期版は主要都市のみ（100〜200件程度）
   - 将来的に全市町村データを追加

### Phase 3: 基本画面実装

1. ホーム画面
2. ルーレット選択画面
3. 地方選択画面 / 都道府県選択画面

### Phase 4: ルーレット機能実装

1. `RouletteWheel` コンポーネント作成
2. アニメーション実装
3. ランダム選択ロジック
4. 結果表示画面

### Phase 5: SNSシェア機能

1. シェア機能実装
2. メッセージフォーマット作成

### Phase 6: UI/UX調整

1. デザイン調整
2. アニメーション微調整
3. レスポンシブ対応

---

## デザインガイドライン

### カラーパレット（仮）

```typescript
export const Colors = {
  primary: '#FF6B6B',      // メインカラー（赤系）
  secondary: '#4ECDC4',    // アクセントカラー（青緑系）
  background: '#FFFFFF',   // 背景
  text: '#2C3E50',        // テキスト
  textLight: '#95A5A6',   // 薄いテキスト
  success: '#2ECC71',     // 成功
  warning: '#F39C12',     // 警告
};
```

### タイポグラフィ

- **ヘッダー**: 24px, Bold
- **サブヘッダー**: 18px, SemiBold
- **本文**: 16px, Regular
- **キャプション**: 14px, Regular

### コンポーネントスタイル

- **ボタン**: 角丸12px、パディング16px、シャドウ付き
- **カード**: 角丸16px、パディング20px、シャドウ付き
- **ルーレット**: 円形、グラデーション、回転中は発光エフェクト

---

## パフォーマンス要件

- ルーレットアニメーション: 60FPS以上
- アプリ起動時間: 3秒以内
- メモリ使用量: 100MB以下

---

## テスト項目

### 機能テスト

- [ ] 各ルーレットタイプが正常に動作する
- [ ] アニメーションがスムーズに動作する
- [ ] 結果が正しく表示される
- [ ] SNSシェアが正常に動作する
- [ ] 画面遷移がスムーズ

### デバイステスト

- [ ] iOS実機
- [ ] Android実機
- [ ] Webブラウザ
- [ ] 各種画面サイズ

---

## MVP対象外機能（将来実装）

以下は現バージョンでは実装しない：

- ユーザー登録・ログイン
- 履歴・コレクション機能
- グループ・ルーム機能
- チェックイン機能
- アプリ内SNS
- 観光スポット情報
- 地図表示
- お気に入り機能
- フィルター機能（予算、移動時間など）

---

## 開発時の注意点

1. **TypeScript厳格モード**: すべて型定義を行う
2. **コンポーネント設計**: 再利用可能な設計を心がける
3. **パフォーマンス**: アニメーションは最適化を重視
4. **データ管理**: 将来的なスケーラビリティを考慮
5. **エラーハンドリング**: 適切なエラー処理を実装

---

## 環境変数（必要に応じて）

```
# .env
APP_NAME=旅ガチャ
APP_VERSION=1.0.0
```

---

## リリース準備

### iOS
- Apple Developer アカウント登録
- App Store Connect設定
- アプリアイコン準備（1024x1024px）

### Android
- Google Play Console登録
- キーストア作成
- アプリアイコン準備（512x512px）

---

## 参考リンク

- [Expo公式ドキュメント](https://docs.expo.dev/)
- [React Native公式ドキュメント](https://reactnative.dev/)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Expo Sharing](https://docs.expo.dev/versions/latest/sdk/sharing/)

---

## バージョン履歴

- **v1.0.0 (MVP)**: 基本的なルーレット機能とSNSシェア

---

**作成日**: 2025年11月10日
**最終更新**: 2025年11月10日
