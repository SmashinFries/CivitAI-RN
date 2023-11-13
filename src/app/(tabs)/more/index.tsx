import { ScrollView, ToastAndroid, View } from 'react-native';
import { ActivityIndicator, Button, List, Portal, Switch, Text } from 'react-native-paper';
import { openWebBrowser } from '../../../utils/web';
import Constants from 'expo-constants';
import { useSettingsStore, useThemeStore } from '../../../store';
import { NSFWLevelDialog } from '../../../components/more/dialogs';
import { useState } from 'react';
import { UpdateDialog, checkForUpdates } from '../../../components/updates';
import switchTheme from 'react-native-theme-switch-animation';

const MorePage = () => {
    const { darkMode, toggleDarkMode } = useThemeStore();
    const { showNSFW, maxNSFWLevel, autoUpdate, toggleAutoUpdate, toggleShowNSFW } =
        useSettingsStore();

    const [showNSFWDialog, setShowNSFWDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);

    const onDarkModeChange = (value: boolean) => {
        switchTheme({
            switchThemeFunction: () => {toggleDarkMode(value)},
            animationConfig: {
                type: 'fade',
                duration: 900,
              },
        },)
    };

    const onCheckUpdatePress = async () => {
        setIsCheckingUpdate(true);
        const isAvailable = await checkForUpdates();
        setIsCheckingUpdate(false);
        if (isAvailable) {
            setShowUpdateDialog(true);
        } else {
            ToastAndroid.show('No updates available', ToastAndroid.LONG);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <List.Item
                title="Dark Mode"
                right={(props) => <Switch value={darkMode} onValueChange={onDarkModeChange} />}
            />
            <List.Item
                title="NSFW"
                right={(props) => <Switch value={showNSFW} onValueChange={toggleShowNSFW} />}
            />
            <List.Item
                title="Max NSFW Level"
                onPress={() => setShowNSFWDialog(true)}
                right={(props) => <Text>{maxNSFWLevel}</Text>}
            />
            <List.Item
                title="Check for Update"
                onPress={onCheckUpdatePress}
                right={(props) => isCheckingUpdate && <ActivityIndicator {...props} />}
            />
            {/* <List.Item
                title="Auto Update"
                description={'Updates and restarts app automatically at startup'}
                disabled
                right={(props) => (
                    <Switch value={autoUpdate} disabled onValueChange={toggleAutoUpdate} />
                )}
            /> */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text variant="titleLarge">
                    Current Version: {Constants.expoConfig?.version}
                    {'\n\n'}
                </Text>
                <Text style={{ textAlign: 'center' }}>
                    This is a very early development build!{'\n\n'}PRs are most appreciated!
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button
                        icon={'github'}
                        onPress={() => openWebBrowser(Constants.expoConfig?.githubUrl ?? '')}
                    >
                        Github
                    </Button>
                </View>
            </View>
            <Portal>
                <NSFWLevelDialog
                    visible={showNSFWDialog}
                    onDismiss={() => setShowNSFWDialog(false)}
                />
                <UpdateDialog
                    visible={showUpdateDialog}
                    onDismiss={() => setShowUpdateDialog(false)}
                />
            </Portal>
        </ScrollView>
    );
};

export default MorePage;
