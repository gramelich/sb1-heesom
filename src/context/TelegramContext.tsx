import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppConfig } from '../types';

interface TelegramContextType {
  config: AppConfig;
  updateConfig: (config: AppConfig) => void;
}

const defaultConfig: AppConfig = {
  telegram: {
    botToken: '',
    chatId: '',
    enabled: false
  },
  supabase: {
    url: '',
    apiKey: ''
  }
};

const TelegramContext = createContext<TelegramContextType | undefined>(undefined);

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('appConfig');
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem('appConfig', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
  };

  return (
    <TelegramContext.Provider
      value={{
        config,
        updateConfig
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (context === undefined) {
    throw new Error('useTelegram must be used within a TelegramProvider');
  }
  return context;
};