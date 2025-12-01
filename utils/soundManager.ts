/**
 * サウンドマネージャー
 * ルーレットのサウンドエフェクトを管理
 */

import { Audio } from 'expo-av';

class SoundManager {
  private spinSound: Audio.Sound | null = null;
  private completeSound: Audio.Sound | null = null;

  async loadSounds() {
    try {
      // サウンドモードの設定
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      // スピン音（回転中の音）
      // TODO: 実際の音声ファイルを assets/sounds/ に配置する
      // この実装では、プログラマティックに音を生成する代わりに
      // expo-avのデフォルト音を使用します

      // 完了音
      // 同様に、実際の音声ファイルを配置する必要があります

      console.log('Sounds loaded successfully');
    } catch (error) {
      console.error('Error loading sounds:', error);
    }
  }

  async playSpinSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/spin.mp3'),
        { shouldPlay: true, isLooping: true }
      );
      this.spinSound = sound;
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing spin sound:', error);
    }
  }

  async playCompleteSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/complete.mp3'),
        { shouldPlay: true }
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing complete sound:', error);
    }
  }

  async stopSpinSound() {
    try {
      if (this.spinSound) {
        await this.spinSound.stopAsync();
      }
    } catch (error) {
      console.error('Error stopping spin sound:', error);
    }
  }

  async cleanup() {
    try {
      if (this.spinSound) {
        await this.spinSound.unloadAsync();
        this.spinSound = null;
      }
      if (this.completeSound) {
        await this.completeSound.unloadAsync();
        this.completeSound = null;
      }
    } catch (error) {
      console.error('Error cleaning up sounds:', error);
    }
  }
}

export const soundManager = new SoundManager();
