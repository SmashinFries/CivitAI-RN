import { ScrollView, View, useWindowDimensions } from "react-native";
import { Text, List } from "react-native-paper";
import { Image } from "expo-image"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageStackParamList } from "../../app/navigation/types";
import { useEffect } from "react";
import { useImagesQuery } from "../../app/api/api";
import { ListHeading } from "../../components/text";
import { InteractionBar } from "./components/interaction";
import { MetaField } from "./components/meta";
import { StatsBar } from "./components/stats";

export const ImageDetails = ({navigation, route}:NativeStackScreenProps<ImageStackParamList, 'ImageDetails'>) => {
    const windowSize = useWindowDimensions();
    const { id, img_url, height, width} = route.params;

    const {fetchImages, loading, results} = useImagesQuery();

    useEffect(() => {
        if (!results && id) {
            fetchImages({
                imageId: id
            })
        }
    },[results, id]);

    return(
        <ScrollView style={{flex:1}}>
            <Image source={{uri: img_url}} style={{aspectRatio:width/height, alignSelf:'center', width: windowSize.width, maxHeight: windowSize.height/1.5}} />
            <InteractionBar id={id} image_url={img_url} share_url={`https://civitai.com/images/${results?.items[0]?.id}`} />
            <StatsBar {...results?.items[0]?.stats} />
            <MetaField label="SD Version" value={results?.items[0]?.meta?.Version} />
            <MetaField label="Resolution" value={results?.items[0]?.meta?.Size} />
            <MetaField label="Prompt" value={results?.items[0]?.meta?.prompt} />
            <MetaField label="Negative Prompt" value={results?.items[0]?.meta?.negativePrompt} />
            <MetaField label="Model" value={results?.items[0]?.meta?.Model} />
            <MetaField label="Sampler" value={results?.items[0]?.meta?.sampler} />
            <MetaField label="CFG Scale" value={results?.items[0]?.meta?.cfgScale} />
            <MetaField label="Clip Skip" value={results?.items[0]?.meta["Clip skip"]} />
        </ScrollView>
    )
}