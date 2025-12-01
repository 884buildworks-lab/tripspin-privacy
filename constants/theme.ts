/**
 * 旅ガチャアプリのカラーテーマとスタイル定数
 * ライトモードとダークモードの両方に対応
 */

import { Platform } from 'react-native';

// 旅ガチャのブランドカラー
const primaryColor = '#FF6B6B';      // メインカラー（赤系）
const secondaryColor = '#4ECDC4';    // アクセントカラー（青緑系）

const tintColorLight = primaryColor;
const tintColorDark = secondaryColor;

export const Colors = {
  light: {
    text: '#2C3E50',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: primaryColor,
    secondary: secondaryColor,
    textLight: '#95A5A6',
    success: '#2ECC71',
    warning: '#F39C12',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: primaryColor,
    secondary: secondaryColor,
    textLight: '#9BA1A6',
    success: '#2ECC71',
    warning: '#F39C12',
  },
};

// スペーシング定数
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// 角丸定数
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  circle: 9999,
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
