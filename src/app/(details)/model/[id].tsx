import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useImagesQuery, useModelQuery } from '../../../api/api';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ModelTags, ModelVersionTag } from '../../../components/models/tags';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import {
    CivitAIImage,
    CivitAIModelVersionsItem,
    CivitAiImageSort,
    CivitAiNSFW,
    Period,
} from '../../../api/civitai';
import { ImageCard } from '../../../components/images/card';
import { LoadingIcon } from '../../../components/loading';
import { List, useTheme } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';
import { ModelInfo } from '../../../components/models/sections';
import { useSaveStore, useSettingsStore } from '../../../store';
import { ThemedRefreshControl } from '../../../components/refreshControl';
import { InteractionBar, UserBar } from '../../../components/interaction';

const ModelDetails = () => {
    const { colors } = useTheme();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const { width } = useWindowDimensions();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data, refetch } = useModelQuery(id);
    const { showNSFW } = useSettingsStore();
    const { models, saveModel, removeModel } = useSaveStore();

    const isSaved = useMemo(
        () => (models.find((value) => value.id === Number(id)) ? true : false),
        [models, id],
    );

    const [versionSelected, setVersionSelected] = useState<CivitAIModelVersionsItem | null>(
        data?.modelVersions[0] ?? null,
    );
    const images = useImagesQuery(
        {
            modelVersionId: versionSelected?.id,
            period: Period.AllTime,
            nsfw: showNSFW ? undefined : CivitAiNSFW.None,
            sort: CivitAiImageSort.MostReactions,
            username: data?.creator?.username,
            limit: 30,
        },
        data?.creator?.username && versionSelected?.id ? true : false,
    );

    const keyExtractor = useCallback((item: any, index: number) => index.toString(), []);

    const ImageRender = useCallback(
        ({ item, index }: ListRenderItemInfo<CivitAIImage>) => {
            return (
                <View style={{ margin: 10 }}>
                    <ImageCard item={item} width={width} maxHeight={400} />
                </View>
            );
        },
        [images.data],
    );

    const onRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        await images.refetch();
        setIsRefreshing(false);
    };

    const imageData = useMemo(
        () => images.data?.pages.flatMap((page) => page.items),
        [images.data],
    );

    useEffect(() => {
        if (data) {
            setVersionSelected(data?.modelVersions[0]);
        }
    }, [data]);

    if (!data) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <LoadingIcon />
            </View>
        );
    }

    return (
        <>
            <Stack.Screen
                options={{
                    title: data?.name ?? '',
                    headerShown: true,
                }}
            />
            <ScrollView
                style={{ flex: 1 }}
                refreshControl={
                    <ThemedRefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                }
            >
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {data?.modelVersions.map((modelVersion, index) => (
                        <View key={index} style={{ marginHorizontal: 10 }}>
                            <ModelVersionTag
                                name={modelVersion.name}
                                isSelected={modelVersion.id === versionSelected?.id}
                                onPress={() => setVersionSelected(modelVersion)}
                            />
                        </View>
                    ))}
                </ScrollView>
                <View style={{ minHeight: 350 }}>
                    {!images.isFetching ? (
                        <FlashList
                            horizontal
                            data={imageData}
                            keyExtractor={keyExtractor}
                            renderItem={(props) => <ImageRender {...props} />}
                            estimatedItemSize={350}
                            contentContainerStyle={{ padding: 15 }}
                            showsHorizontalScrollIndicator={false}
                        />
                    ) : (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <LoadingIcon />
                        </View>
                    )}
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {data?.tags.map((tag, index) => (
                        <View key={index} style={{ margin: 10 }}>
                            <ModelTags name={tag} />
                        </View>
                    ))}
                </ScrollView>
                {/* <Button mode="outlined" style={{marginHorizontal:10}} icon='earth' onPress={() => openWebBrowser(`https://civitai.com/models/${data?.id}`)}>View Site</Button> */}
                <InteractionBar
                    isSaved={isSaved}
                    saveItem={() =>
                        saveModel({ ...data, savedAt: new Date().toLocaleDateString() })
                    }
                    removeItem={() => removeModel(data?.id)}
                    share_url={`https://civitai.com/models/${data?.id}`}
                />
                <UserBar username={data?.creator.username} user_img={data?.creator.image} />
                {versionSelected && (
                    <ModelInfo
                        type={data?.type}
                        uploaded={versionSelected?.createdAt}
                        downloads={versionSelected?.stats?.downloadCount}
                        baseModel={versionSelected?.baseModel ?? ''}
                        triggerWords={versionSelected?.trainedWords}
                        air={`${versionSelected?.modelId}@${versionSelected?.id}`}
                    />
                )}
                <List.Accordion title="Description">
                    <View style={{ paddingHorizontal: 10 }}>
                        <RenderHTML
                            source={{ html: data?.description }}
                            baseStyle={{ color: colors.onBackground }}
                            contentWidth={width}
                        />
                    </View>
                </List.Accordion>
            </ScrollView>
        </>
    );
};

export default ModelDetails;
