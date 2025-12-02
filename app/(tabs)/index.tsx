import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/Button';
import { useSound } from '@/contexts/SoundContext';

export default function HomeScreen() {
  const { soundEnabled, toggleSound } = useSound();

  const handleStartRoulette = () => {
    router.push('/roulette-select');
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.soundToggle}
        onPress={toggleSound}
        activeOpacity={0.7}
      >
        <Ionicons
          name={soundEnabled ? 'volume-high' : 'volume-mute'}
          size={32}
          color={soundEnabled ? '#FF6B6B' : '#95A5A6'}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          旅ガチャ
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          友達と旅行先を{'\n'}
          ルーレットで決めよう！
        </ThemedText>
        <View style={styles.buttonContainer}>
          <Button
            title="ルーレットを始める"
            onPress={handleStartRoulette}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  soundToggle: {
    position: 'absolute',
    top: 48,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingBottom: 100, // バナー広告分のスペース確保
  },
  title: {
    fontSize: 48,
    lineHeight: 64,
    marginBottom: 24,
    textAlign: 'center',
    paddingVertical: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 28,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});
