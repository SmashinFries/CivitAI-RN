import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { PaperProvider, Portal, adaptNavigationTheme } from 'react-native-paper';
import { ThemeProvider, DarkTheme as NavDarkTheme, DefaultTheme } from '@react-navigation/native';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useSettingsStore, useThemeStore } from '../store';
import { darkTheme, lightTheme } from '../store/themes';
import { UpdateDialog, checkForUpdates } from '../components/updates';
import { useEffect, useState } from 'react';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
    reactNavigationDark: NavDarkTheme,
    materialDark: darkTheme,
    materialLight: lightTheme,
});

const queryClient = new QueryClient();

const RootLayout = () => {
    const { darkMode } = useThemeStore();
    // const { autoUpdate } = useSettingsStore();
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    // This broke the app \_0-0_/
    // useEffect(() => {
    // 	if (!__DEV__) {
    // 		checkForUpdates().then(isAvailable => setShowUpdateDialog(isAvailable));
    // 	}
    // },[]);

    useEffect(() => {
        setStatusBarStyle(darkMode ? 'light' : 'dark');
    }, [darkMode]);

    return (
        <PaperProvider theme={darkMode ? darkTheme : lightTheme}>
            <ThemeProvider value={darkMode ? DarkTheme : LightTheme}>
                <QueryClientProvider client={queryClient}>
                    <Stack screenOptions={{ animation: 'slide_from_bottom', headerShown: false }} />
                </QueryClientProvider>
            </ThemeProvider>
        </PaperProvider>
    );
};

export default RootLayout;
