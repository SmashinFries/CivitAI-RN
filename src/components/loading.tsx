import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { useEffect } from 'react';

type LoadingIconProps = {
    // isLoading: boolean;
};
export const LoadingIcon = ({}: LoadingIconProps) => {
    const rotation = useSharedValue(0);

    const style = useAnimatedStyle(
        () => ({
            transform: [{ rotateZ: `${rotation.value}deg` }],
        }),
        [rotation.value],
    );

    useEffect(() => {
        // a simple rotation animation for fun
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 1500,
                easing: Easing.linear,
            }),
            -1,
            false,
        );
        return () => cancelAnimation(rotation);
    }, []);

    return (
        <Animated.View style={[style, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
            <Image
                source={{
                    uri: 'https://github.com/civitai/civitai/blob/main/public/images/android-chrome-192x192.png?raw=true',
                }}
                style={{ height: 80, width: 80 }}
            />
        </Animated.View>
    );
};
