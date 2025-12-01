/**
 * 音声設定用Context
 * アプリ全体で音声のON/OFF設定を管理
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  isLoading: boolean;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const SOUND_SETTING_KEY = '@trip_spin:sound_enabled';

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // 初回起動時に設定を読み込み
  useEffect(() => {
    loadSoundSetting();
  }, []);

  const loadSoundSetting = async () => {
    try {
      const value = await AsyncStorage.getItem(SOUND_SETTING_KEY);
      if (value !== null) {
        setSoundEnabled(value === 'true');
      }
    } catch (error) {
      console.error('Failed to load sound setting:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSound = async () => {
    try {
      const newValue = !soundEnabled;
      setSoundEnabled(newValue);
      await AsyncStorage.setItem(SOUND_SETTING_KEY, String(newValue));
    } catch (error) {
      console.error('Failed to save sound setting:', error);
    }
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, isLoading }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
