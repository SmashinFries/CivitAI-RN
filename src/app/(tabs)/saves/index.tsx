import { View, useWindowDimensions } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import {
    TabView,
    SceneMap,
    TabBar,
    SceneRendererProps,
    NavigationState,
} from 'react-native-tab-view';
import { SavedImage, SavedModel, useSaveStore } from '../../../store';
import { FlashList, MasonryFlashList } from '@shopify/flash-list';
import { useCallback, useState } from 'react';
import Animated from 'react-native-reanimated';
import { ImageCard } from '../../../components/images/card';
import { ThemedRefreshControl } from '../../../components/refreshControl';
import { EmptySavesList } from '../../../components/saves/emptyList';
import { Image } from 'expo-image';
import { ModelCard } from '../../../components/models/card';

const SavedImages = () => {
    const { images, removeImage } = useSaveStore();
    const { width, height } = useWindowDimensions();

    const keyExtractor = useCallback((item: SavedImage, index: number) => item.id.toString(), []);

    const RenderItem = useCallback(({ item, index }: { item: SavedImage; index: number }) => {
        return (
            <Animated.View
                style={{ width: width / 2, margin: 5, maxHeight: height / 2 }}
                sharedTransitionTag="ImageDetail"
            >
                <ImageCard isSaved={false} item={item} maxHeight={height / 2} width={width / 2} />
                {/* <Image style={{height:200, width:120}} source={{uri:item.url}} /> */}
            </Animated.View>
        );
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <MasonryFlashList
                data={images}
                keyExtractor={keyExtractor}
                renderItem={RenderItem}
                numColumns={2}
                estimatedItemSize={271}
                ListEmptyComponent={() => <EmptySavesList tabName="images" />}
            />
        </View>
    );
};

const SavedModels = () => {
    const { models, removeModel } = useSaveStore();
    const { width, height } = useWindowDimensions();

    const keyExtractor = useCallback((item: SavedModel, index: number) => item.id.toString(), []);

    const RenderItem = useCallback(({ item, index }: { item: SavedModel; index: number }) => {
        return (
            <Animated.View
                style={{ width: width / 2, margin: 5, maxHeight: height / 2 }}
                sharedTransitionTag="ImageDetail"
            >
                <ModelCard item={item} index={index} />
                {/* <Image style={{height:200, width:120}} source={{uri:item.url}} /> */}
            </Animated.View>
        );
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlashList
                data={models}
                keyExtractor={keyExtractor}
                renderItem={RenderItem}
                numColumns={2}
                centerContent
                estimatedItemSize={229}
                ListEmptyComponent={() => <EmptySavesList tabName="models" />}
            />
        </View>
    );
};

const renderScene = SceneMap({
    first: SavedModels,
    second: SavedImages,
});

type RenderTabBarProps = SceneRendererProps & {
    navigationState: NavigationState<{ key: string; title: string }>;
};
const RenderTabBar = (props: RenderTabBarProps) => {
    const { colors } = useTheme();
    return (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.primary }}
            style={{ backgroundColor: colors.surface }}
            labelStyle={{ color: colors.onSurfaceVariant }}
            activeColor={colors.primary}
        />
    );
};

export const SavesPage = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Models' },
        { key: 'second', title: 'Images' },
    ]);
    return (
        <TabView
            renderTabBar={RenderTabBar}
            animationEnabled
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
};

export default SavesPage;
