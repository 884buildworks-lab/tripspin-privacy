# トリップスピン アイコンデザイン仕様

## デザインコンセプト
「ルーレット」×「日本旅行」を表現する、明るく楽しいアイコン

---

## デザイン案

### メインデザイン（推奨）

**中心モチーフ**: 回転するルーレット円盤 + 日本列島シルエット

**カラースキーム**:
- ベースカラー: グラデーション（#FF6B6B → #FF8E53）明るい赤〜オレンジ
- アクセント: #4ECDC4（青緑）
- ハイライト: #FFD93D（黄色）
- シャドウ: #2C3E50（濃紺）

**レイアウト構成**:
```
┌─────────────────┐
│   🎯🔄🗾         │  ← 円形の背景（グラデーション）
│                 │
│   ┌───────┐     │
│   │ 🗾回  │     │  ← 中央にルーレット盤
│   │ 転⭐  │     │     日本列島 + 矢印マーク
│   └───────┘     │
│                 │
│   TripSpin      │  ← 下部に小さくアプリ名（オプション）
└─────────────────┘
```

**詳細要素**:
1. **背景**: 円形、放射状グラデーション（中心が明るい）
2. **ルーレット円盤**:
   - 8分割のカラフルなセグメント
   - 各セグメントは異なる色（赤、青、緑、黄、橙、紫、ピンク、水色）
3. **日本列島**: 中央に白いシルエット（シンプルな形状）
4. **矢印**: 上部に赤い三角形の矢印（ルーレットの針）
5. **輝き**: 星やキラキラエフェクトを数個配置

---

## サイズ別最適化

### 1024x1024 (App Store / Play Store)
- 全要素を高解像度で表示
- 細かいディテール（セグメントの境界線、影）を追加
- アプリ名テキストを含める

### 512x512 (Play Store)
- メイン要素のみ
- テキストなし推奨

### 192x192 (Android Adaptive Icon - Foreground)
- ルーレット + 日本列島のみ
- 周囲20%は余白確保（Adaptive Icon対応）

### 108x108 (Android Adaptive Icon - Monochrome)
- 単色（黒）でシンプルなアウトライン
- ルーレット円 + 日本列島シルエットのみ

### 48x48 (小さいサイズ)
- セグメント数を4つに削減
- 日本列島の形状を簡略化
- 矢印を太く見やすく

---

## カラーバリエーション

### バージョンA（推奨）- ビビッドカラー
- 背景: #FF6B6B → #FF8E53（赤〜オレンジグラデーション）
- ルーレット: マルチカラー
- 日本列島: 白 (#FFFFFF)
- 矢印: 濃い赤 (#E74C3C)

### バージョンB - クールトーン
- 背景: #4ECDC4 → #3498DB（青緑〜青グラデーション）
- ルーレット: 寒色系マルチカラー
- 日本列島: 白 (#FFFFFF)
- 矢印: 黄色 (#FFD93D)

### バージョンC - ポップ
- 背景: #FFD93D → #FFA502（黄〜オレンジグラデーション）
- ルーレット: パステルマルチカラー
- 日本列島: 濃紺 (#2C3E50)
- 矢印: 赤 (#FF6B6B)

---

## SVGコード例（シンプル版）

```svg
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGradient">
      <stop offset="0%" style="stop-color:#FF8E53;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FF6B6B;stop-opacity:1" />
    </radialGradient>
  </defs>

  <!-- Background Circle -->
  <circle cx="512" cy="512" r="512" fill="url(#bgGradient)"/>

  <!-- Roulette Wheel -->
  <circle cx="512" cy="512" r="380" fill="#FFFFFF" stroke="#2C3E50" stroke-width="8"/>

  <!-- Segments (8 colors) -->
  <path d="M 512 512 L 892 512 A 380 380 0 0 1 780.7 780.7 Z" fill="#FF6B6B"/>
  <path d="M 512 512 L 780.7 780.7 A 380 380 0 0 1 512 892 Z" fill="#4ECDC4"/>
  <path d="M 512 512 L 512 892 A 380 380 0 0 1 243.3 780.7 Z" fill="#FFD93D"/>
  <path d="M 512 512 L 243.3 780.7 A 380 380 0 0 1 132 512 Z" fill="#A29BFE"/>
  <path d="M 512 512 L 132 512 A 380 380 0 0 1 243.3 243.3 Z" fill="#2ECC71"/>
  <path d="M 512 512 L 243.3 243.3 A 380 380 0 0 1 512 132 Z" fill="#FD79A8"/>
  <path d="M 512 512 L 512 132 A 380 380 0 0 1 780.7 243.3 Z" fill="#74B9FF"/>
  <path d="M 512 512 L 780.7 243.3 A 380 380 0 0 1 892 512 Z" fill="#FAB1A0"/>

  <!-- Center Circle -->
  <circle cx="512" cy="512" r="280" fill="#FFFFFF"/>

  <!-- Japan Silhouette (Simplified) -->
  <path d="M 500 350 L 520 340 L 540 350 L 550 370 L 560 390 L 550 420 L 540 450 L 530 480 L 520 510 L 510 530 L 500 540 L 490 530 L 480 510 L 470 480 L 460 450 L 450 420 L 440 390 L 450 370 L 470 350 L 490 345 Z"
        fill="#2C3E50" opacity="0.3"/>

  <!-- Arrow (Pointer) -->
  <polygon points="512,100 480,180 544,180" fill="#E74C3C"/>

  <!-- Sparkles -->
  <circle cx="300" cy="300" r="20" fill="#FFD93D" opacity="0.8"/>
  <circle cx="724" cy="300" r="15" fill="#FFD93D" opacity="0.8"/>
  <circle cx="724" cy="724" r="18" fill="#FFD93D" opacity="0.8"/>
</svg>
```

---

## Figmaでの作成手順

1. **1024x1024のフレーム作成**

2. **背景作成**:
   - 円形（1024x1024）
   - グラデーション: 放射状、中心#FF8E53 → 外側#FF6B6B

3. **ルーレット本体**:
   - 円形（760x760）、中央配置
   - 白背景 + 境界線

4. **セグメント作成**:
   - 45度ずつ回転させた8つの扇形
   - 各色を配置

5. **中央円**:
   - 円形（560x560）、中央配置
   - 白背景

6. **日本列島**:
   - SVGインポート or 手描き
   - シンプルなシルエット
   - 濃いグレー/紺色

7. **矢印**:
   - 三角形、上部中央
   - 赤色 #E74C3C

8. **エフェクト追加**:
   - 小さな円（星）を3〜4個配置
   - 黄色 #FFD93D、透明度80%

9. **エクスポート**:
   - PNG 1024x1024 (App Store)
   - PNG 512x512 (Play Store)
   - PNG 192x192 (Android Adaptive - Foreground)
   - PNG 108x108 (Android Adaptive - Monochrome, 黒一色)

---

## 実装ファイル構成

```
assets/
├── icon.png                    # 1024x1024 (Expo default)
├── icon-512.png               # 512x512 (Google Play)
├── adaptive-icon.png          # 1024x1024 (Android Adaptive base)
├── adaptive-icon-foreground.png  # Foreground layer
├── adaptive-icon-background.png  # Background layer (単色 or グラデーション)
├── adaptive-icon-monochrome.png  # Android 13+ monochrome
├── favicon.png                # 48x48 (Web)
└── splash-icon.png            # スプラッシュ画面用（必要に応じて）
```

---

## デザインツール選択肢

### 1. Figma（推奨）
- 無料で高機能
- ブラウザで動作
- エクスポートが簡単

### 2. Canva
- テンプレートが豊富
- 初心者向け
- 無料版で十分

### 3. Adobe Illustrator
- プロ向け
- SVG編集に最適
- 有料

### 4. オンラインツール
- https://www.appicon.co/ (アイコンジェネレーター)
- https://icon.kitchen/ (Android Adaptive Icon生成)

---

## 納品ファイルリスト

- [x] icon.png (1024x1024)
- [x] icon-512.png (512x512)
- [x] adaptive-icon.png (1024x1024)
- [x] adaptive-icon-foreground.png (432x432 with padding)
- [x] adaptive-icon-background.png (1024x1024 solid color)
- [x] adaptive-icon-monochrome.png (1024x1024 black on transparent)
- [x] favicon.png (48x48)

---

## 注意事項

1. **セーフゾーン**: Android Adaptive Iconは外周20%がマスクされる可能性があるため、重要な要素は中央80%に配置

2. **視認性**: 小さいサイズでも認識できるよう、シンプルなデザインを心がける

3. **ブランド統一**: アプリ内のカラースキームと一致させる

4. **文字の扱い**: 小さいサイズでは文字は読めないため、アイコンには文字を含めない（1024x1024のみOK）

---

## 制作時間目安

- Figmaでの制作: 2〜3時間
- Canvaでの制作: 1〜2時間
- 外注（Fiverr等）: $10〜30、1〜3日

