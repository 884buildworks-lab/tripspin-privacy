import { StyleSheet, ScrollView, FlatList } from 'react-native';
import { router, Stack } from 'expo-router';
import { useState } from 'react';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { RouletteCard } from '@/components/RouletteCard';
import { getPrefectures } from '@/utils/dataLoader';

export default function PrefectureSelectScreen() {
  const prefectures = getPrefectures();

  const handleSelectPrefecture = (prefectureId: number) => {
    router.push(`/roulette?type=city-prefecture&prefecture=${prefectureId}`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: '都道府県を選ぶ',
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          都道府県を選ぶ
        </ThemedText>

        <FlatList
          data={prefectures}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <RouletteCard
              title={item.name}
              description={item.description}
              onPress={() => handleSelectPrefecture(item.id)}
            />
          )}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 100, // バナー広告分のスペース確保
  },
});
