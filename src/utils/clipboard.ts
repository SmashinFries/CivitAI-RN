import * as Clipboard from 'expo-clipboard';
import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics';

export const copyToClipboard = (text: string | number | undefined) => {
    if (!text) return;
    Clipboard.setStringAsync(`${text}`);
    impactAsync(ImpactFeedbackStyle.Light);
};
