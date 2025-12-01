/**
 * ルーレット選択カードコンポーネント
 * ルーレット選択画面などで使用するカード型のコンポーネント
 */

import { Pressable, StyleSheet, type PressableProps } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface RouletteCardProps extends Omit<PressableProps, 'style'> {
  title: string;
  description?: string;
  onPress: () => void;
}

export function RouletteCard({
  title,
  description,
  onPress,
  ...props
}: RouletteCardProps) {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
      {...props}
    >
      <ThemedView style={styles.cardContent}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {title}
        </ThemedText>
        {description && (
          <ThemedText style={styles.description}>
            {description}
          </ThemedText>
        )}
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
  },
});
