import { ScrollView, View, useWindowDimensions } from "react-native";
import { useImageIdQuery, useImagesQuery } from "../../api/api";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { InteractionBar } from "../../components/images/interaction";
import { StatsBar } from "../../components/images/stats";
import { MetaField } from "../../components/images/meta";

const ImageDetails = () => {
    const windowSize = useWindowDimensions();
    const { id } = useLocalSearchParams<{ id: string }>();
    const {data, isFetching} = useImageIdQuery({imageId:id});

    return(
        <ScrollView style={{flex:1}}>
            {data?.items[0] ? <View>
                <Image source={{uri: data?.items[0]?.url}} style={{aspectRatio:data?.items[0]?.width/data?.items[0]?.height, alignSelf:'center', width: windowSize.width, maxHeight: windowSize.height/1.5}} />
                <InteractionBar id={data?.items[0]?.id} image_url={data?.items[0]?.url} share_url={`https://civitai.com/images/${data?.items[0]?.id}`} />
                <StatsBar {...data?.items[0]?.stats} />
                <MetaField label="Model" value={data?.items[0]?.meta?.Model} />
                <MetaField label="SD Version" value={data?.items[0]?.meta?.Version} />
                <MetaField label="Resolution" value={data?.items[0]?.meta?.Size} />
                <MetaField label="Prompt" value={data?.items[0]?.meta?.prompt} />
                <MetaField label="Negative Prompt" value={data?.items[0]?.meta?.negativePrompt} />
                
                <MetaField label="Sampler" value={data?.items[0]?.meta?.sampler} />
                <MetaField label="CFG Scale" value={data?.items[0]?.meta?.cfgScale} />
                <MetaField label="Clip Skip" value={data?.items[0]?.meta && data?.items[0]?.meta["Clip skip"]} />
            </View> : <ActivityIndicator size={'large'} />}
        </ScrollView>
    )
}

export default ImageDetails;