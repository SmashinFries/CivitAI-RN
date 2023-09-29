import { ToastAndroid } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

export const downloadImage = async (url: string, name: string | null = null) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    const formattedTitle = name ?? 'mal_' + url.split('/').pop()?.split('.')[0];
    const fileUri = FileSystem.documentDirectory + formattedTitle + '.jpg';
    if (status === MediaLibrary.PermissionStatus.GRANTED) {
        try {
            const result = await FileSystem.downloadAsync(url, fileUri);
            await MediaLibrary.saveToLibraryAsync(result.uri);
            await impactAsync(ImpactFeedbackStyle.Light);
            ToastAndroid.show('Image Saved', ToastAndroid.SHORT);
        } catch (e) {
            console.log(e);
        }
    }
};
