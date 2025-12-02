import { StyleSheet, ScrollView } from 'react-native';
import { router, Stack } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { RouletteCard } from '@/components/RouletteCard';

export default function RouletteSelectScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'ルーレットを選ぶ',
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedText type="title" style={styles.title}>
            ルーレットを選ぶ
          </ThemedText>

          <RouletteCard
            title="全国（都道府県）"
            description="47都道府県からランダムに選ぶ"
            onPress={() => router.push('/roulette?type=prefecture-all')}
          />

          <RouletteCard
            title="全国（市町村）"
            description="全国の市町村からランダムに選ぶ"
            onPress={() => router.push('/roulette?type=city-all')}
          />

          <RouletteCard
            title="地方別（市町村）"
            description="特定の地方の市町村から選ぶ"
            onPress={() => router.push('/region-select')}
          />

          <RouletteCard
            title="都道府県内（市町村）"
            description="特定の都道府県内の市町村から選ぶ"
            onPress={() => router.push('/prefecture-select')}
          />
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
    padding: 16,
    paddingTop: 24,
    paddingBottom: 100, // バナー広告分のスペース確保
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
  },
});
