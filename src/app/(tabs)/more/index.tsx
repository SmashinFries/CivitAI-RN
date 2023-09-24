import { View } from 'react-native';
import { Button, List, Switch, Text } from 'react-native-paper';
import { openWebBrowser } from '../../../utils/web';
import Constants from 'expo-constants';
import { useThemeStore } from '../../../store';
import { StatusBar } from 'expo-status-bar';

const MorePage = () => {
	const {darkMode, toggleDarkMode} = useThemeStore();

	const onDarkModeChange = (value: boolean) => {
		toggleDarkMode(value);
	};

	return(
		<View style={{flex:1}}>
			<List.Item title='Dark Mode' right={props => <Switch value={darkMode} onValueChange={onDarkModeChange} />} />
			<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
				<Text variant='titleLarge'>Current Version: {Constants.expoConfig?.version}{'\n\n'}</Text>
				<Text style={{textAlign:'center'}}>This is a very early development build!{'\n\n'}More features are being worked on, so keep an eye on the github page for updates{'\n\n'}PRs are most appreciated!</Text>
				<View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
					<Button icon={'github'} onPress={() => openWebBrowser(Constants.expoConfig?.githubUrl ?? '')}>Github</Button>
				</View>
			</View>
		</View>
	);
}

export default MorePage;