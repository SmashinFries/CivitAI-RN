import { Tabs, withLayoutContext } from "expo-router";
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
	createMaterialBottomTabNavigator,
	MaterialBottomTabNavigationOptions,
  } from "@react-navigation/material-bottom-tabs";
  
const { Navigator } = createMaterialBottomTabNavigator();

// Copied from https://github.com/EvanBacon/expo-router-layouts-example/blob/main/layouts/material-bottom-tabs.tsx
// Not sure how to properly type this
export const MaterialBottomTabs = withLayoutContext<
	MaterialBottomTabNavigationOptions,
	typeof Navigator
>(Navigator);

const TabLayout = () => {
    return(
        <MaterialBottomTabs initialRouteName='models'>
			<MaterialBottomTabs.Screen name="models" options={{title:'Models', tabBarIcon: 'database-outline'}} />
			<MaterialBottomTabs.Screen name="images" options={{title:'Images', tabBarIcon: 'image-multiple-outline'}} />
			<MaterialBottomTabs.Screen name="creators" options={{ title:'Creators', tabBarIcon:'account-outline'}} />
			<MaterialBottomTabs.Screen name="more" options={{title:'More', tabBarIcon: 'dots-horizontal'}} />
		</MaterialBottomTabs>
    );
};

export default TabLayout;