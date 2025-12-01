import { StyleSheet, ScrollView } from 'react-native';
import { router, Stack } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { RouletteCard } from '@/components/RouletteCard';
import { REGIONS } from '@/constants/regions';
import type { RegionKey } from '@/types';

export default function RegionSelectScreen() {
  const handleSelectRegion = (regionKey: RegionKey) => {
    router.push(`/roulette?type=city-region&region=${regionKey}`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '地方を選ぶ',
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedText type="title" style={styles.title}>
            地方を選ぶ
          </ThemedText>

          {Object.entries(REGIONS).map(([key, name]) => (
            <RouletteCard
              key={key}
              title={name}
              onPress={() => handleSelectRegion(key as RegionKey)}
            />
          ))}
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
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
  },
});
