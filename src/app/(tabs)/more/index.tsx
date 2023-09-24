import { View } from 'react-native';
import { Button, List, Portal, Switch, Text } from 'react-native-paper';
import { openWebBrowser } from '../../../utils/web';
import Constants from 'expo-constants';
import { useSettingsStore, useThemeStore } from '../../../store';
import { setStatusBarStyle } from 'expo-status-bar';
import { NSFWLevelDialog } from '../../../components/more/dialogs';
import { useState } from 'react';

const MorePage = () => {
	const {darkMode, toggleDarkMode} = useThemeStore();
	const {showNSFW, maxNSFWLevel, toggleShowNSFW} = useSettingsStore();

	const [showNSFWDialog, setShowNSFWDialog] = useState(false);

	const onDarkModeChange = (value: boolean) => {
		toggleDarkMode(value);
		setStatusBarStyle(value ? 'light' : 'dark');
	};

	return(
		<View style={{flex:1}}>
			<List.Item title='Dark Mode' right={props => <Switch value={darkMode} onValueChange={onDarkModeChange} />} />
			<List.Item title='NSFW' right={props => <Switch value={showNSFW} onValueChange={toggleShowNSFW} />} />
			<List.Item title='Max NSFW Level' onPress={() => setShowNSFWDialog(true)} right={props => <Text>{maxNSFWLevel}</Text>} />
			<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
				<Text variant='titleLarge'>Current Version: {Constants.expoConfig?.version}{'\n\n'}</Text>
				<Text style={{textAlign:'center'}}>This is a very early development build!{'\n\n'}More features are being worked on, so keep an eye on the github page for updates{'\n\n'}PRs are most appreciated!</Text>
				<View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
					<Button icon={'github'} onPress={() => openWebBrowser(Constants.expoConfig?.githubUrl ?? '')}>Github</Button>
				</View>
			</View>
			<Portal>
				<NSFWLevelDialog visible={showNSFWDialog} onDismiss={() => setShowNSFWDialog(false)} />
			</Portal>
		</View>
	);
}

export default MorePage;