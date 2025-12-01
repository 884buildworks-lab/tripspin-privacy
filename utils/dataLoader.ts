/**
 * データ読み込みユーティリティ
 * JSONファイルから都道府県・市町村データを取得
 */

import type { Prefecture, City, RegionKey } from '@/types';
import prefecturesData from '@/data/prefectures.json';
import citiesData from '@/data/cities.json';

/**
 * すべての都道府県データを取得
 * @returns 都道府県の配列
 */
export const getPrefectures = (): Prefecture[] => {
  return prefecturesData as Prefecture[];
};

/**
 * すべての市町村データを取得
 * @returns 市町村の配列
 */
export const getAllCities = (): City[] => {
  return citiesData as City[];
};

/**
 * 特定の地方の市町村データを取得
 * @param region 地方キー
 * @returns 指定地方の市町村の配列
 */
export const getCitiesByRegion = (region: RegionKey): City[] => {
  return (citiesData as City[]).filter(city => city.region === region);
};

/**
 * 特定の都道府県の市町村データを取得
 * @param prefectureId 都道府県ID
 * @returns 指定都道府県の市町村の配列
 */
export const getCitiesByPrefecture = (prefectureId: number): City[] => {
  return (citiesData as City[]).filter(city => city.prefecture_id === prefectureId);
};

/**
 * 都道府県IDから都道府県データを取得
 * @param prefectureId 都道府県ID
 * @returns 都道府県データ、見つからない場合はundefined
 */
export const getPrefectureById = (prefectureId: number): Prefecture | undefined => {
  return (prefecturesData as Prefecture[]).find(pref => pref.id === prefectureId);
};
