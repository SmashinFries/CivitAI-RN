import { Tabs } from "expo-router";
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const TabLayout = () => {
    return(
        <Tabs initialRouteName='models' screenOptions={props => ({tabBarStyle:{height:56}, headerShown:false})}>
					<Tabs.Screen name="models" options={{title:'Models', tabBarIcon:props => <Icon {...props} name='database-outline' />}} />
					<Tabs.Screen name="images" options={{title:'Images', tabBarIcon:props => <Icon {...props} name='image-multiple-outline' />}} />
					<Tabs.Screen name="creators" options={{href: null, title:'Creators', tabBarIcon:props => <Icon {...props} name='account-outline' />}} />
					<Tabs.Screen name="more" options={{title:'More', tabBarIcon:props => <Icon {...props} name='dots-horizontal' />}} />
					{/* <Tabs.Screen name="index" options={{href: null}} /> */}
				</Tabs>
    );
};

export default TabLayout;