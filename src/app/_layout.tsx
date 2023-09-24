import { Stack } from 'expo-router';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { ThemeProvider, DarkTheme as NavDarkTheme, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useThemeStore } from '../store';
import { darkTheme, lightTheme } from '../store/themes';

const { LightTheme, DarkTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme, reactNavigationDark: NavDarkTheme, materialDark:darkTheme, materialLight:lightTheme });

const queryClient = new QueryClient();

const RootLayout = () => {
	const {darkMode} = useThemeStore();

	return(
		<PaperProvider theme={darkMode ? darkTheme : lightTheme}>
			<ThemeProvider value={darkMode ? DarkTheme : LightTheme}>
				<QueryClientProvider client={queryClient}>
					<Stack screenOptions={{animation:'slide_from_bottom', headerShown:false}} />
					<StatusBar style={darkMode ? 'light' : 'dark'} />
				</QueryClientProvider>
			</ThemeProvider>
		</PaperProvider>
  );
};

export default RootLayout;