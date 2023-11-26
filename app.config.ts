import { ExpoConfig, ConfigContext } from 'expo/config';
const IS_DEV = process.env.APP_VARIANT === 'development';

export default ({ config }: ConfigContext): ExpoConfig => ({
    name: IS_DEV ? "CivitAI-RN DEV" : "CivitAI-RN",
    slug: "CivitAI-RN",
    scheme: IS_DEV ? "civitai-rn-dev" : "civitai-rn",
    version: "0.0.6",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    githubUrl: "https://github.com/SmashinFries/CivitAI-RN",
    updates: {
      checkAutomatically: "ON_LOAD",
      url: "https://u.expo.dev/4681a90b-4400-40d3-9f51-0fa5d54f31f1"
    },
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: IS_DEV ? 'com.civitAiRNDev' : "com.civitAiRN"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-updates",
        {
          username: "kuzutech"
        }
      ]
    ],
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "4681a90b-4400-40d3-9f51-0fa5d54f31f1"
      }
    },
    runtimeVersion: {
      policy: "sdkVersion"
    }
});