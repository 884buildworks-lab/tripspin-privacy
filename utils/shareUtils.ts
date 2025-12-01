/**
 * SNSシェアユーティリティ
 * 結果をSNSでシェアする機能
 */

import { Share, Platform, Alert } from 'react-native';
import type { RouletteResult } from '@/types';

/**
 * シェアメッセージをフォーマット
 * @param result ルーレット結果
 * @returns フォーマットされたメッセージ
 */
export const formatShareMessage = (result: RouletteResult): string => {
  const locationText = result.type === 'city' && result.prefecture_name
    ? `${result.prefecture_name}${result.name}`
    : result.name;

  return `旅ガチャで${locationText}に決まりました！🎯✨\n\n次の旅行は${locationText}で決まり！\n\n#旅ガチャ #TripRoulette #旅行 #${result.name}`;
};

/**
 * 結果をシェア
 * @param result ルーレット結果
 * @returns シェアが完了したかどうか
 */
export const shareResult = async (result: RouletteResult): Promise<boolean> => {
  try {
    // メッセージをフォーマット
    const message = formatShareMessage(result);

    // シェアを実行
    const shareResult = await Share.share(
      {
        message: message,
        title: '旅ガチャの結果',
      },
      {
        // iOSの場合、特定のアクティビティタイプを除外
        excludedActivityTypes: Platform.OS === 'ios' ? [
          'com.apple.UIKit.activity.Print',
          'com.apple.UIKit.activity.AssignToContact',
          'com.apple.UIKit.activity.SaveToCameraRoll',
        ] : undefined,
      }
    );

    // シェアが成功したかどうかを判定
    if (shareResult.action === Share.sharedAction) {
      if (Platform.OS === 'ios' && shareResult.activityType) {
        console.log(`シェアされました: ${shareResult.activityType}`);
      } else {
        console.log('シェアされました');
      }
      return true;
    } else if (shareResult.action === Share.dismissedAction) {
      console.log('シェアがキャンセルされました');
      return false;
    }

    return false;
  } catch (error: any) {
    console.error('シェアエラー:', error);
    Alert.alert('エラー', 'シェアに失敗しました');
    return false;
  }
};

/**
 * シェア機能が利用可能かチェック
 * @returns 利用可能な場合true
 */
export const isShareAvailable = (): boolean => {
  // React NativeのShare APIはiOS、Android、Webで利用可能
  return true;
};
