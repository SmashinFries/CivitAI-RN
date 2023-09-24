import { ScrollView, View, useWindowDimensions } from "react-native";
import { useModelQuery } from "../../api/api";
import { Image } from "expo-image";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import { RefreshControl } from "react-native-gesture-handler";
import { ModelVersionTag } from "../../components/models/tags";
import { useCallback, useState } from "react";
import { FlashList, ListRenderItemInfo } from "@shopify/flash-list";
import { CivitAIModelItem, ModelImagesItem } from "../../api/civitai";
import { ImageCard, ModelImageCard } from "../../components/images/card";
import { LoadingIcon } from "../../components/loading";

const ModelDetails = () => {
    const { width } = useWindowDimensions();
    const { id } = useLocalSearchParams<{ id: string }>();
    const {data, isFetching, refetch, isRefetching} = useModelQuery(id);

    // select version based on index of the model version array
    const [versionSelected, setVersionSelected] = useState(0);

    const keyExtractor = useCallback((item:any, index:number) => index.toString(),[]);

    const ImageRender = useCallback(({item, index}:ListRenderItemInfo<ModelImagesItem>) => {
        return(
            <View style={{margin:10}}>
                <ModelImageCard index={index} item={item} width={width} maxHeight={400} />  
            </View>
        );
    },[]);

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
            <ScrollView refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {data?.modelVersions.map((modelVersion, index) => (
                        <View key={index}  style={{marginHorizontal:10}}> 
                            <ModelVersionTag name={modelVersion.name} isSelected={index === versionSelected} onPress={() => setVersionSelected(index)} />
                        </View>
                    ))}
                </ScrollView>
                <FlashList 
                    horizontal
                    data={data?.modelVersions[versionSelected].images}
                    keyExtractor={keyExtractor}
                    renderItem={props => <ImageRender {...props} />}
                    estimatedItemSize={350}
                    contentContainerStyle={{padding:15}}
                />
                {/* {data?.items[0] ? <View>
                    
                </View> : <ActivityIndicator size={'large'} />} */}
                
            </ScrollView>
        </>
        
    )
}

export default ModelDetails;