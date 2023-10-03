import { Stack } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';
import { ModelSearchHeader } from '../../../components/headers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ModelSearchDrawer } from '../../../components/models/search/drawer';
import { Button, Portal, Text } from 'react-native-paper';
import useModelSearch from '../../../hooks/models/search/useModelSearch';
import { MasonryFlashList } from '@shopify/flash-list';
import { CivitAIModelItem } from '../../../api/civitai';
import Animated from 'react-native-reanimated';
import { ModelCard } from '../../../components/models/card';
import { useSaveStore } from '../../../store';
import { ThemedRefreshControl } from '../../../components/refreshControl';
import { LoadingIcon } from '../../../components/loading';

const ModelSearchPage = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { width, height } = useWindowDimensions();
    const { models } = useSaveStore();

    const modelSearch = useModelSearch();

    const keyExtractor = (item: CivitAIModelItem, idx: number) => item.id.toString();

    const RenderItem = useCallback(
        (props: { item: CivitAIModelItem; index: number }) => {
            return (
                <Animated.View style={{ width: width / 2, margin: 5, maxHeight: height / 2 }}>
                    <ModelCard
                        {...props}
                        isSaved={models.find((model) => model.id === props.item.id) ? true : false}
                    />
                </Animated.View>
            );
        },
        [width, height, models],
    );

    const allItems = useMemo(
        () => modelSearch.data?.pages.flatMap((page) => page.items),
        [modelSearch.data],
    );

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    header: (props) => (
                        <ModelSearchHeader
                            {...props}
                            updateSearch={(txt) => modelSearch.updateSearch(txt)}
                            toggleDrawer={() => setIsDrawerOpen((prev) => !prev)}
                            search={modelSearch.searchQuery}
                            onSearch={(txt) => modelSearch.onSearchPress()}
                        />
                    ),
                }}
            />
            <ModelSearchDrawer
                open={isDrawerOpen}
                toggleDrawer={() => setIsDrawerOpen((prev) => !prev)}
                nsfw={modelSearch.nsfw}
                onNsfwChange={modelSearch.updateNsfw}
                period={modelSearch.period}
                onPeriodChange={modelSearch.updatePeriod}
                sort={modelSearch.sort}
                onSortChange={modelSearch.updateSort}
                tag={modelSearch.tagQuery}
                onTagChange={modelSearch.updateTag}
                type={modelSearch.modelType}
                onTypeChange={modelSearch.updateModelType}
                username={modelSearch.usernameQuery}
                onUsernameChange={modelSearch.updateUserName}
                search={modelSearch.searchQuery}
                onSearchChange={modelSearch.updateSearch}
                onSearchPress={modelSearch.onSearchPress}
            />
            <View style={{ flex: 1, width: width }}>
                {modelSearch.data ? (
                    <MasonryFlashList
                        data={allItems}
                        keyExtractor={keyExtractor}
                        renderItem={RenderItem}
                        numColumns={2}
                        estimatedItemSize={271}
                        keyboardShouldPersistTaps="always"
                        keyboardDismissMode="on-drag"
                        refreshControl={
                            <ThemedRefreshControl
                                refreshing={modelSearch.isRefetching}
                                onRefresh={modelSearch.refetch}
                            />
                        }
                        onEndReached={modelSearch.fetchNextPage}
                        onEndReachedThreshold={0.7}
                    />
                ) : (
                    <LoadingIcon />
                )}
            </View>
        </>
    );
};

export default ModelSearchPage;
