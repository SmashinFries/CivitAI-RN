import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { CivitAiNSFW } from '../api/civitai';

type ThemeState = {
    darkMode: boolean;
}

type ThemeAction = {
    toggleDarkMode: (mode: ThemeState['darkMode']) => void
}

// themes could be expanded more (custom themes) so its separated from the settings store
export const useThemeStore = create<ThemeState & ThemeAction>()(
    persist(
        (set, get) => ({
            darkMode: get()?.darkMode ?? Appearance.getColorScheme() === 'dark' ? true : false,
            toggleDarkMode: (mode) => set(() => ({ darkMode: mode })),
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

type SettingsState = {
    showNSFW: boolean;
    maxNSFWLevel: CivitAiNSFW;
}

type SettingsAction = {
    toggleShowNSFW: (mode: SettingsState['showNSFW']) => void;
    setMaxNSFWLevel: (level: SettingsState['maxNSFWLevel']) => void;
};

export const useSettingsStore = create<SettingsState & SettingsAction>()(
    persist(
        (set, get) => ({
            showNSFW: get()?.showNSFW ?? false,
            maxNSFWLevel: get()?.maxNSFWLevel ?? CivitAiNSFW.None,
            toggleShowNSFW: (mode) => set(() => ({ showNSFW: mode })),
            setMaxNSFWLevel: (level) => set(() => ({ maxNSFWLevel: level })),
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);