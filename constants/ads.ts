import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

// テスト用広告ID（本番環境では実際のIDに置き換えてください）
export const AD_UNIT_IDS = {
  banner: TestIds.ADAPTIVE_BANNER,
  interstitial: TestIds.INTERSTITIAL,
  appOpen: TestIds.APP_OPEN,
};

// 本番用広告ID（AdMobで取得後にここに設定）
// export const AD_UNIT_IDS = {
//   banner: Platform.select({
//     ios: 'ca-app-pub-XXXXX/XXXXX',
//     android: 'ca-app-pub-XXXXX/XXXXX',
//   }) || '',
//   interstitial: Platform.select({
//     ios: 'ca-app-pub-XXXXX/XXXXX',
//     android: 'ca-app-pub-XXXXX/XXXXX',
//   }) || '',
//   appOpen: Platform.select({
//     ios: 'ca-app-pub-XXXXX/XXXXX',
//     android: 'ca-app-pub-XXXXX/XXXXX',
//   }) || '',
// };

// インタースティシャル広告を表示する間隔（ルーレット回転回数）
export const INTERSTITIAL_INTERVAL = 8;
