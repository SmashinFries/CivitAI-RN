import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { CivitAIImage, CivitAIModelItem, CivitAiNSFW } from '../api/civitai';

type ThemeState = {
    darkMode: boolean;
};

type ThemeAction = {
    toggleDarkMode: (mode: ThemeState['darkMode']) => void;
};

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
        },
    ),
);

type SettingsState = {
    showNSFW: boolean;
    maxNSFWLevel: CivitAiNSFW;
    autoUpdate: boolean;
};

type SettingsAction = {
    toggleShowNSFW: (mode: SettingsState['showNSFW']) => void;
    setMaxNSFWLevel: (level: SettingsState['maxNSFWLevel']) => void;
    toggleAutoUpdate: (mode: SettingsState['autoUpdate']) => void;
};

export const useSettingsStore = create<SettingsState & SettingsAction>()(
    persist(
        (set, get) => ({
            autoUpdate: get()?.autoUpdate ?? true,
            showNSFW: get()?.showNSFW ?? false,
            maxNSFWLevel: get()?.maxNSFWLevel ?? CivitAiNSFW.None,
            toggleShowNSFW: (mode) => set(() => ({ showNSFW: mode })),
            setMaxNSFWLevel: (level) => set(() => ({ maxNSFWLevel: level })),
            toggleAutoUpdate: (mode) => set(() => ({ autoUpdate: mode })),
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

type SavedExtraData = {
    savedAt: string;
};
export type SavedModel = CivitAIModelItem & SavedExtraData;
export type SavedImage = CivitAIImage & SavedExtraData;
export type SavesState = {
    models: SavedModel[];
    images: SavedImage[];
};

type SavesAction = {
    saveModel: (model: SavedModel) => void;
    saveImage: (image: SavedImage) => void;
    removeModel: (modelId: number) => void;
    removeImage: (imageId: number) => void;
};

export const useSaveStore = create<SavesState & SavesAction>()(
    persist(
        (set, get) => ({
            models: get()?.models ?? [],
            images: get()?.images ?? [],
            saveModel: (model) => set(({ models }) => ({ models: [...models, model] })),
            saveImage: (image) => set(({ images }) => ({ images: [...images, image] })),
            removeModel: (modelId) =>
                set(({ models }) => ({ models: models.filter((model) => model.id !== modelId) })),
            removeImage: (imageId) =>
                set(({ images }) => ({ images: images.filter((image) => image.id !== imageId) })),
        }),
        {
            name: 'theme-storage',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
