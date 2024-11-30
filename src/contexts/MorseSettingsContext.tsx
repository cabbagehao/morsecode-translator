import React, { createContext, useContext, useState } from 'react';

interface MorseSettings {
  showSlash: boolean;
  toggleSlash: () => void;
}

const MorseSettingsContext = createContext<MorseSettings | undefined>(undefined);

export function MorseSettingsProvider({ children }: { children: React.ReactNode }) {
  const [showSlash, setShowSlash] = useState(true); // Changed default to true

  const toggleSlash = () => {
    setShowSlash(!showSlash);
  };

  const value = {
    showSlash,
    toggleSlash
  };

  return (
    <MorseSettingsContext.Provider value={value}>
      {children}
    </MorseSettingsContext.Provider>
  );
}

export function useMorseSettings() {
  const context = useContext(MorseSettingsContext);
  if (context === undefined) {
    throw new Error('useMorseSettings must be used within a MorseSettingsProvider');
  }
  return context;
}