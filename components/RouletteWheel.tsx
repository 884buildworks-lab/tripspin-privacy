/**
 * ルーレットホイールコンポーネント
 * react-native-reanimatedを使用した滑らかな回転アニメーション
 */

import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { ThemedText } from './themed-text';
import { useSound } from '@/contexts/SoundContext';
import { soundManager } from '@/utils/soundManager';

export interface RouletteWheelProps {
  items: string[];
  isSpinning: boolean;
  onSpinComplete: (selectedIndex: number) => void;
  muted?: boolean;
}

export function RouletteWheel({ items, isSpinning, onSpinComplete, muted = false }: RouletteWheelProps) {
  const rotation = useSharedValue(0);
  const { soundEnabled } = useSound();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const handleSpinComplete = async (selectedIndex: number) => {
    // スピン音を停止
    if (!muted && soundEnabled) {
      await soundManager.stopSpinSound();
      await soundManager.playCompleteSound();
    }
    onSpinComplete(selectedIndex);
  };

  useEffect(() => {
    if (isSpinning) {
      // サウンドエフェクトを再生
      if (!muted && soundEnabled) {
        soundManager.playSpinSound();
      }

      // ランダムな最終角度を計算
      const randomAngle = Math.floor(Math.random() * 360);
      const totalRotation = rotation.value + 360 * 5 + randomAngle; // 5回転 + ランダム

      rotation.value = withTiming(
        totalRotation,
        {
          duration: 4000,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        (finished) => {
          if (finished) {
            // 最終角度から選択されたアイテムのインデックスを計算
            const normalizedAngle = totalRotation % 360;
            const selectedIndex = Math.floor((normalizedAngle / 360) * items.length);
            runOnJS(handleSpinComplete)(selectedIndex);
          }
        }
      );
    }
  }, [isSpinning, soundEnabled, muted]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wheel, animatedStyle]}>
        <View style={styles.wheelInner}>
          <ThemedText style={styles.wheelText}>
            {items.length}
          </ThemedText>
          <ThemedText style={styles.wheelSubText}>
            件
          </ThemedText>
        </View>
      </Animated.View>

      {/* 固定のポインター */}
      <View style={styles.pointer}>
        <View style={styles.pointerTriangle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  wheel: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  wheelInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#4ECDC4',
  },
  wheelText: {
    fontSize: 48,
    lineHeight: 64,
    fontWeight: 'bold',
    color: '#FF6B6B',
    paddingVertical: 4,
  },
  wheelSubText: {
    fontSize: 24,
    lineHeight: 32,
    color: '#4ECDC4',
    paddingVertical: 2,
  },
  pointer: {
    position: 'absolute',
    top: 20,
    width: 0,
    height: 0,
  },
  pointerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4ECDC4',
  },
});
