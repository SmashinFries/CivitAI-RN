import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import CustomLightTheme from './light.json';
import CustomDarkTheme from './dark.json';

export const lightTheme = {
    ...MD3LightTheme,
    colors: CustomLightTheme.colors,
};

export const darkTheme = {
    ...MD3DarkTheme,
    colors: CustomDarkTheme.colors,
};
