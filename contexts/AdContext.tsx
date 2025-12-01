import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import {
  InterstitialAd,
  AdEventType,
  AppOpenAd,
} from 'react-native-google-mobile-ads';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { AD_UNIT_IDS, INTERSTITIAL_INTERVAL } from '@/constants/ads';

interface AdContextType {
  spinCount: number;
  incrementSpinCount: () => void;
  showInterstitialIfNeeded: () => Promise<void>;
  isInterstitialLoading: boolean;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export function useAds() {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
}

interface AdProviderProps {
  children: ReactNode;
}

export function AdProvider({ children }: AdProviderProps) {
  const [spinCount, setSpinCount] = useState(0);
  const [isInterstitialLoading, setIsInterstitialLoading] = useState(false);

  const interstitialRef = useRef<InterstitialAd | null>(null);
  const appOpenAdRef = useRef<AppOpenAd | null>(null);
  const appStateRef = useRef(AppState.currentState);
  const lastAdShowTimeRef = useRef(Date.now());

  // インタースティシャル広告の読み込み
  const loadInterstitial = () => {
    if (Platform.OS === 'web') return;

    const interstitial = InterstitialAd.createForAdRequest(AD_UNIT_IDS.interstitial);

    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setIsInterstitialLoading(false);
    });

    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      loadInterstitial(); // 次の広告を事前読み込み
    });

    interstitial.addAdEventListener(AdEventType.ERROR, () => {
      setIsInterstitialLoading(false);
    });

    interstitialRef.current = interstitial;
    interstitial.load();
  };

  // アプリオープン広告の読み込み
  const loadAppOpenAd = () => {
    if (Platform.OS === 'web') return;

    const appOpenAd = AppOpenAd.createForAdRequest(AD_UNIT_IDS.appOpen);

    appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
      // 広告が読み込まれた
    });

    appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
      lastAdShowTimeRef.current = Date.now();
      loadAppOpenAd(); // 次の広告を事前読み込み
    });

    appOpenAdRef.current = appOpenAd;
    appOpenAd.load();
  };

  // アプリがフォアグラウンドに戻った時の処理
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appStateRef.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // 最後の広告表示から4時間以上経過している場合のみ表示
      const timeSinceLastAd = Date.now() - lastAdShowTimeRef.current;
      const fourHoursInMs = 4 * 60 * 60 * 1000;

      if (timeSinceLastAd > fourHoursInMs && appOpenAdRef.current?.loaded) {
        appOpenAdRef.current.show();
      }
    }
    appStateRef.current = nextAppState;
  };

  useEffect(() => {
    if (Platform.OS !== 'web') {
      loadInterstitial();
      loadAppOpenAd();

      const subscription = AppState.addEventListener('change', handleAppStateChange);

      return () => {
        subscription.remove();
      };
    }
  }, []);

  const incrementSpinCount = () => {
    setSpinCount((prev) => prev + 1);
  };

  const showInterstitialIfNeeded = async () => {
    if (Platform.OS === 'web') return;

    const newCount = spinCount + 1;

    // 8回ごとにインタースティシャル広告を表示
    if (newCount % INTERSTITIAL_INTERVAL === 0 && interstitialRef.current?.loaded) {
      setIsInterstitialLoading(true);
      try {
        await interstitialRef.current.show();
      } catch (error) {
        console.log('Failed to show interstitial:', error);
      } finally {
        setIsInterstitialLoading(false);
      }
    }
  };

  return (
    <AdContext.Provider
      value={{
        spinCount,
        incrementSpinCount,
        showInterstitialIfNeeded,
        isInterstitialLoading,
      }}
    >
      {children}
    </AdContext.Provider>
  );
}
