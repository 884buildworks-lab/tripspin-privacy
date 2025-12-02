import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/Button';
import { RouletteWheel } from '@/components/RouletteWheel';
import { getRouletteItems, executeRoulette } from '@/utils/rouletteLogic';
import { useAds } from '@/contexts/AdContext';
import type { RouletteType, RegionKey } from '@/types';

export default function RouletteScreen() {
  const params = useLocalSearchParams<{
    type: RouletteType;
    region?: RegionKey;
    prefecture?: string;
  }>();

  const [isSpinning, setIsSpinning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { incrementSpinCount, showInterstitialIfNeeded } = useAds();

  // ルーレットアイテムを取得
  const items = getRouletteItems(
    params.type,
    params.region,
    params.prefecture ? Number(params.prefecture) : undefined
  );

  const handleSpin = (muted: boolean = false) => {
    if (items.length === 0) {
      alert('選択できる項目がありません');
      return;
    }
    setIsMuted(muted);
    setIsSpinning(true);
  };

  const handleSpinComplete = async (selectedIndex: number) => {
    setIsSpinning(false);

    // スピンカウントを増加
    incrementSpinCount();

    // 結果を実行
    const result = executeRoulette(
      params.type,
      params.region,
      params.prefecture ? Number(params.prefecture) : undefined
    );

    // インタースティシャル広告を表示（8回ごと）
    await showInterstitialIfNeeded();

    // 結果画面に遷移
    router.push({
      pathname: '/result',
      params: { result: JSON.stringify(result) },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'ルーレット',
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedText type="title" style={styles.title}>
            ルーレット
          </ThemedText>

          <ThemedText style={styles.instruction}>
            {isSpinning ? '回転中...' : 'ボタンを押してルーレットを回そう！'}
          </ThemedText>

          <RouletteWheel
            items={items.map((item) => item.name)}
            isSpinning={isSpinning}
            onSpinComplete={handleSpinComplete}
            muted={isMuted}
          />

          <View style={styles.buttonContainer}>
            <Button
              title={isSpinning ? '回転中...' : '回す！'}
              onPress={() => handleSpin(false)}
              disabled={isSpinning}
            />
            <View style={styles.buttonSpacer} />
            <Button
              title={isSpinning ? '回転中...' : '回す！（無音）'}
              onPress={() => handleSpin(true)}
              disabled={isSpinning}
              variant="muted"
            />
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 120, // バナー広告分のスペース確保（ボタン2つ分も考慮）
  },
  title: {
    fontSize: 32,
    lineHeight: 44,
    marginBottom: 16,
    textAlign: 'center',
    paddingVertical: 4,
  },
  instruction: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginTop: 32,
  },
  buttonSpacer: {
    height: 16,
  },
});
