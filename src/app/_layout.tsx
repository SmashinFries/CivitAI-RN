import { Navigator, Slot, Tabs, } from 'expo-router';
import { BottomNavigation, MD3LightTheme, PaperProvider, adaptNavigationTheme } from 'react-native-paper';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeProvider, DarkTheme as NavDarkTheme, DefaultTheme, TabRouter } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PaperHeader } from '../components/headers';
import { View } from 'react-native';

const { LightTheme, DarkTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme, reactNavigationDark: NavDarkTheme });

const queryClient = new QueryClient();

const RootLayout = () => {
  return(
    <PaperProvider theme={MD3LightTheme}>
      	<ThemeProvider value={LightTheme}>
			<QueryClientProvider client={queryClient}>
				<Tabs initialRouteName='models' screenOptions={props => ({tabBarStyle:{height:56}, tabBar: () => <View></View>, headerShown:false})}>
					<Tabs.Screen name="models" options={{title:'Models', tabBarIcon:props => <MaterialCommunityIcons {...props} name='database-outline' />}} />
					<Tabs.Screen name="images" options={{title:'Images', tabBarIcon:props => <MaterialCommunityIcons {...props} name='image-multiple-outline' />}} />
					<Tabs.Screen name="creators" options={{href: null, title:'Creators', tabBarIcon:props => <MaterialCommunityIcons {...props} name='account-outline' />}} />
					<Tabs.Screen name="more" options={{title:'More', tabBarIcon:props => <MaterialCommunityIcons {...props} name='dots-horizontal' />}} />
					<Tabs.Screen name="index" options={{href: null}} />
				</Tabs>
			</QueryClientProvider>
			<StatusBar style="dark" />
    	</ThemeProvider>
    </PaperProvider>
    
  );
};

export default RootLayout;