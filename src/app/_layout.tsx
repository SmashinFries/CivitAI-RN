import { Navigator, Slot, Stack, Tabs, } from 'expo-router';
import { BottomNavigation, MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
// @ts-ignore
import { ThemeProvider, DarkTheme as NavDarkTheme, DefaultTheme, TabRouter } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useThemeStore } from '../store';

const { LightTheme, DarkTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme, reactNavigationDark: NavDarkTheme });

const queryClient = new QueryClient();

const RootLayout = () => {
	const {darkMode} = useThemeStore();
	return(
		<PaperProvider theme={darkMode ? MD3DarkTheme : MD3LightTheme}>
			<ThemeProvider value={darkMode ? DarkTheme : LightTheme}>
				<QueryClientProvider client={queryClient}>
					<Stack screenOptions={{animation:'slide_from_bottom', headerShown:false}} />
				</QueryClientProvider>
				{/* <StatusBar style={darkMode ? 'light' : 'dark'} /> */}
			</ThemeProvider>
		</PaperProvider>
  );
};

export default RootLayout;