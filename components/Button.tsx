/**
 * 共通ボタンコンポーネント
 * プライマリ・セカンダリの2つのバリアントをサポート
 */

import { Pressable, StyleSheet, type PressableProps } from 'react-native';
import { ThemedText } from './themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'muted';
  disabled?: boolean;
  onPress: () => void;
}

export function Button({
  title,
  variant = 'primary',
  disabled = false,
  onPress,
  ...props
}: ButtonProps) {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' ? styles.primaryButton :
        variant === 'secondary' ? styles.secondaryButton :
        styles.mutedButton,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      {...props}
    >
      <ThemedText
        style={[
          styles.buttonText,
          variant === 'primary' ? styles.primaryText :
          variant === 'secondary' ? styles.secondaryText :
          styles.mutedText,
        ]}
      >
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: '#FF6B6B',
  },
  secondaryButton: {
    backgroundColor: '#4ECDC4',
  },
  mutedButton: {
    backgroundColor: '#FFB3B3',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  mutedText: {
    color: '#FFFFFF',
  },
});
