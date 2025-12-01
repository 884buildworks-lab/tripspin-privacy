import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/Button';
import { shareResult } from '@/utils/shareUtils';
import type { RouletteResult } from '@/types';

export default function ResultScreen() {
  const params = useLocalSearchParams<{ result: string }>();

  let result: RouletteResult;
  try {
    result = JSON.parse(params.result);
  } catch (error) {
    console.error('結果のパースエラー:', error);
    return (
      <ThemedView style={styles.container}>
        <ThemedText>エラーが発生しました</ThemedText>
      </ThemedView>
    );
  }

  const handleShare = async () => {
    await shareResult(result);
  };

  const handlePlayAgain = () => {
    router.back();
  };

  const handleSelectNewRoulette = () => {
    router.push('/roulette-select');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '結果発表',
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <View style={styles.content}>
          <ThemedText type="title" style={styles.resultTitle}>
            結果発表！
          </ThemedText>

          <View style={styles.resultCard}>
            <ThemedText type="title" style={styles.resultName}>
              {result.name}
            </ThemedText>
            <ThemedText style={styles.description}>
              {result.description}
            </ThemedText>
            {result.prefecture_name && (
              <ThemedText style={styles.prefecture}>
                {result.prefecture_name}
              </ThemedText>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="シェアする"
              onPress={handleShare}
              variant="primary"
            />

            <View style={styles.buttonSpacer} />

            <Button
              title="同じルーレットをもう一度"
              onPress={handlePlayAgain}
              variant="secondary"
            />

            <View style={styles.buttonSpacer} />

            <Button
              title="ルーレットを選び直す"
              onPress={handleSelectNewRoulette}
              variant="secondary"
            />

            <View style={styles.buttonSpacer} />

            <Button
              title="ホームに戻る"
              onPress={handleGoHome}
              variant="secondary"
            />
          </View>
        </View>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  resultTitle: {
    fontSize: 32,
    lineHeight: 44,
    marginBottom: 32,
    textAlign: 'center',
    paddingVertical: 4,
  },
  resultCard: {
    width: '100%',
    maxWidth: 400,
    padding: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    marginBottom: 32,
    alignItems: 'center',
  },
  resultName: {
    fontSize: 40,
    lineHeight: 56,
    marginBottom: 16,
    textAlign: 'center',
    color: '#FF6B6B',
    paddingVertical: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  prefecture: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  buttonSpacer: {
    height: 12,
  },
});
