/**
 * 型定義ファイル
 * 旅ガチャアプリで使用する型をすべて定義
 */

/**
 * ルーレットのタイプ
 */
export type RouletteType =
  | 'prefecture-all'      // 全国（都道府県）
  | 'city-all'           // 全国（市町村）
  | 'city-region'        // 地方別（市町村）
  | 'city-prefecture';   // 都道府県内（市町村）

/**
 * 地方区分のキー
 */
export type RegionKey =
  | 'hokkaido'    // 北海道
  | 'tohoku'      // 東北
  | 'kanto'       // 関東
  | 'chubu'       // 中部
  | 'kinki'       // 近畿
  | 'chugoku'     // 中国
  | 'shikoku'     // 四国
  | 'kyushu';     // 九州・沖縄

/**
 * 都道府県の型
 */
export interface Prefecture {
  id: number;
  name: string;
  region: RegionKey;
  description: string;
}

/**
 * 市町村の型
 */
export interface City {
  id: number;
  name: string;
  prefecture_id: number;
  prefecture_name: string;
  region: RegionKey;
  description: string;
}

/**
 * ルーレット結果の型
 */
export interface RouletteResult {
  name: string;
  description: string;
  type: 'prefecture' | 'city';
  prefecture_name?: string; // 市町村の場合のみ
}
