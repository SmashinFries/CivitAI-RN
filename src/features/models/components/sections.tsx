import { ActivityIndicator, View, useWindowDimensions } from "react-native";
import { Text} from 'react-native-paper'
import {FlashList} from "@shopify/flash-list";
import { CivitAIModelItem, CivitAIModelSearch } from "../../../app/api/civitai";
import { useCallback } from "react";
import { ModelCard } from "./card";
import { ListHeading } from "../../../components/text";

type ModelSectionProps = {
    data: CivitAIModelSearch | undefined;
    isLoading: boolean;
    title: string;
};
export const ModelSection = ({data, isLoading, title}:ModelSectionProps) => {
    const { width, height } = useWindowDimensions();

    const keyExtractor = useCallback((item:CivitAIModelItem, index:number) => index.toString(),[]);

    return(
        <View style={{ flex:1}}>
            <ListHeading title={title} titleVariant="headlineMedium" />
            <View style={{maxHeight:300}}>
            {(!isLoading) ? <FlashList 
                data={data?.items}
                keyExtractor={keyExtractor}
                renderItem={ModelCard}
                estimatedItemSize={206}
                horizontal
            /> : <ActivityIndicator size="large" />}
            </View>
        </View>
    );
}