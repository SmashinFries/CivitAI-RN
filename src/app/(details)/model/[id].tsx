import { ScrollView, View, useWindowDimensions } from "react-native";
import { useImagesQuery, useModelQuery } from "../../../api/api";
import { Image } from "expo-image";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { RefreshControl } from "react-native-gesture-handler";
import { ModelVersionTag } from "../../../components/models/tags";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { CivitAIImage, CivitAIImages, CivitAIModelItem, CivitAiNSFW, ModelImagesItem, ModelVersionsItem, Period } from "../../../api/civitai";
import { ImageCard, ModelImageCard } from "../../../components/images/card";
import { LoadingIcon } from "../../../components/loading";
import { Button, List, useTheme } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import { ModelInfo } from "../../../components/models/sections";
import { openWebBrowser } from "../../../utils/web";
import { useSettingsStore } from "../../../store";

const ModelDetails = () => {
    const { colors } = useTheme();
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const { width } = useWindowDimensions();
    const { id } = useLocalSearchParams<{ id: string }>();
    const {data, isFetching, refetch, isRefetching} = useModelQuery(id);
    const { showNSFW } = useSettingsStore();

    const [versionSelected, setVersionSelected] = useState<ModelVersionsItem|null>(data?.modelVersions[0] ?? null);
    const images = useImagesQuery({modelVersionId: versionSelected?.id, period:Period.AllTime, nsfw:showNSFW ? undefined : CivitAiNSFW.None, sort: 'Most Reactions', username:data?.creator?.username, limit: 30}, data?.creator?.username && versionSelected?.id ? true : false)

    const keyExtractor = useCallback((item:any, index:number) => index.toString(),[]);

    const ImageRender = useCallback(({item, index}:ListRenderItemInfo<CivitAIImage>) => {
        return(
            <View style={{margin:10}}>
                <ImageCard index={index} item={item} width={width} maxHeight={400} />  
            </View>
        );
    },[images.data]);

    const onRefresh = async() => {
        setIsRefreshing(true);
        await refetch();
        await images.refetch();
        setIsRefreshing(false);
    };

    const imageData = useMemo(
        () => images.data?.pages.flatMap(page => page.items),
        [images.data]
    );

    useEffect(() => {
        if (data) {
            setVersionSelected(data?.modelVersions[0]);
        }
    },[data])

    if (!data) {
        return(
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <LoadingIcon />
            </View>
        );
    }

    return(
        <>
            <Stack.Screen
                options={{
                    title: data?.name ?? ''
                }}
            />
            <ScrollView style={{flex:1}} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {data?.modelVersions.map((modelVersion, index) => (
                        <View key={index}  style={{marginHorizontal:10}}> 
                            <ModelVersionTag name={modelVersion.name} isSelected={modelVersion.id === versionSelected?.id} onPress={() => setVersionSelected(modelVersion)} />
                        </View>
                    ))}
                </ScrollView>
                <View style={{minHeight:350}}>
                    {!images.isFetching ? <FlashList 
                        horizontal
                        data={imageData}
                        keyExtractor={keyExtractor}
                        renderItem={props => <ImageRender {...props} />}
                        estimatedItemSize={350}
                        contentContainerStyle={{padding:15}}
                        showsHorizontalScrollIndicator={false}
                    /> : 
                    <View style={{alignItems:'center', justifyContent:'center'}}> 
                        <LoadingIcon />
                    </View>}
                </View>
                <Button mode="outlined" style={{marginHorizontal:10}} icon='earth' onPress={() => openWebBrowser(`https://civitai.com/models/${data?.id}`)}>View Site</Button>
                {versionSelected && <ModelInfo 
                    type={data?.type} 
                    uploaded={versionSelected?.createdAt}
                    downloads={versionSelected?.stats?.downloadCount} 
                    baseModel={versionSelected?.baseModel ?? ''} 
                    triggerWords={versionSelected?.trainedWords}
                    air={`${versionSelected?.modelId}@${versionSelected?.id}`}
                />}
                <List.Accordion title='Description'>
                    <View  style={{paddingHorizontal:10}}>
                        <RenderHTML source={{html:data?.description}} baseStyle={{color:colors.onBackground}} contentWidth={width} />
                    </View>
                </List.Accordion>
            </ScrollView>
        </>
        
    )
}

export default ModelDetails;