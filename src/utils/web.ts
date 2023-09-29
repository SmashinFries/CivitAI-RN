import * as WebBrowser from 'expo-web-browser';

export const openWebBrowser = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
};
