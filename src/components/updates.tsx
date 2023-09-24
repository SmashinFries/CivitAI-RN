import { ActivityIndicator, Button, Dialog, Text } from 'react-native-paper';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';

export const checkForUpdates = async (autoUpdate:boolean=false) => {
    const results = await Updates.checkForUpdateAsync();
    if (results.isAvailable) {
        return results.isAvailable;
    } else {
        return false;
    }
};

type UpdateDialogProps = {
    visible:boolean;
    onDismiss:() => void;
    autoUpdate?:boolean;
};
export const UpdateDialog = ({visible, autoUpdate, onDismiss}:UpdateDialogProps) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(0);

    const update = async () => {
        if (__DEV__) {
            console.log('Debug mode, cant test updates 😵');
        } else {
            setIsDownloading(true);
            try {
                await Updates.fetchUpdateAsync();
            } catch (e) {
                console.log(e);
            }
            setIsDownloading(false);
            await Updates.reloadAsync();
        }
    };

    useEffect(() => {
        if (autoUpdate && !__DEV__) {
            update();
        }
    },[autoUpdate])

    return(
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Title>Update Available</Dialog.Title>
            <Dialog.Content>
                {!autoUpdate ? <Text>A new update has been cooked!{'\n\n'}Update now?</Text>
                : <Text style={{textAlign:'center'}}>Updating...</Text>
                }
            </Dialog.Content>
            {!autoUpdate ? <Dialog.Actions>
                <Button onPress={onDismiss}>Not Yet</Button>
                {isDownloading ? <ActivityIndicator style={{width:buttonWidth}} /> : <Button onLayout={e => setButtonWidth(e.nativeEvent.layout.width)} onPress={update}>Update</Button>}
            </Dialog.Actions>
            : null}
        </Dialog>
    );
};