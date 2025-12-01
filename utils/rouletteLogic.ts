/**
 * ルーレットロジックユーティリティ
 * ランダム選択とルーレットアイテムの取得
 */

import type { Prefecture, City, RouletteType, RegionKey, RouletteResult } from '@/types';
import {
  getPrefectures,
  getAllCities,
  getCitiesByRegion,
  getCitiesByPrefecture,
} from './dataLoader';

/**
 * 配列からランダムに1つの要素を選択
 * @param items 選択元の配列
 * @returns ランダムに選ばれた要素
 */
const selectRandom = <T>(items: T[]): T => {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
};

/**
 * 都道府県からランダムに選択
 * @returns ランダムに選ばれた都道府県
 */
export const selectRandomPrefecture = (): Prefecture => {
  const prefectures = getPrefectures();
  return selectRandom(prefectures);
};

/**
 * 市町村の配列からランダムに選択
 * @param cities 市町村の配列
 * @returns ランダムに選ばれた市町村
 */
export const selectRandomCity = (cities: City[]): City => {
  if (cities.length === 0) {
    throw new Error('市町村データが見つかりません');
  }
  return selectRandom(cities);
};

/**
 * ルーレットタイプに応じたアイテムリストを取得
 * @param type ルーレットタイプ
 * @param region 地方キー（city-regionの場合必須）
 * @param prefectureId 都道府県ID（city-prefectureの場合必須）
 * @returns 都道府県または市町村の配列
 */
export const getRouletteItems = (
  type: RouletteType,
  region?: RegionKey,
  prefectureId?: number
): (Prefecture | City)[] => {
  switch (type) {
    case 'prefecture-all':
      return getPrefectures();

    case 'city-all':
      return getAllCities();

    case 'city-region':
      if (!region) {
        throw new Error('地方が指定されていません');
      }
      return getCitiesByRegion(region);

    case 'city-prefecture':
      if (!prefectureId) {
        throw new Error('都道府県が指定されていません');
      }
      return getCitiesByPrefecture(prefectureId);

    default:
      throw new Error(`未知のルーレットタイプ: ${type}`);
  }
};

/**
 * ルーレットタイプに応じてランダムに結果を選択
 * @param type ルーレットタイプ
 * @param region 地方キー（city-regionの場合必須）
 * @param prefectureId 都道府県ID（city-prefectureの場合必須）
 * @returns ルーレット結果
 */
export const executeRoulette = (
  type: RouletteType,
  region?: RegionKey,
  prefectureId?: number
): RouletteResult => {
  const items = getRouletteItems(type, region, prefectureId);
  const selected = selectRandom(items);

  if ('prefecture_id' in selected) {
    // City型の場合
    return {
      name: selected.name,
      description: selected.description,
      type: 'city',
      prefecture_name: selected.prefecture_name,
    };
  } else {
    // Prefecture型の場合
    return {
      name: selected.name,
      description: selected.description,
      type: 'prefecture',
    };
  }
};
