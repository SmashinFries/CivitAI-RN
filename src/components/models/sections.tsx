import { ActivityIndicator, View, useWindowDimensions } from "react-native";
import { Text, useTheme} from 'react-native-paper'
import {FlashList} from "@shopify/flash-list";
import { CivitAIModelItem, CivitAIModelSearch, } from "../../api/civitai";
import { useCallback } from "react";
import { ModelCard } from "./card";
import { ListHeading } from "../text";
import { LoadingIcon } from "../loading";

type ModelSectionProps = {
    data: CivitAIModelSearch | undefined;
    isLoading: boolean;
    title: string;
};
export const ModelSection = ({data, isLoading, title}:ModelSectionProps) => {
    const { width, height } = useWindowDimensions();
    const { colors } = useTheme();

    const keyExtractor = useCallback((item:CivitAIModelItem, index:number) => index.toString(),[]);

    return(
        <View style={{ paddingVertical:5}}>
            <ListHeading title={title} titleVariant="headlineMedium" />
            <View style={{maxHeight:400,}}>
            {(!isLoading) ? <FlashList 
                data={data?.items}
                keyExtractor={keyExtractor}
                renderItem={props => <ModelCard themeColors={colors} {...props} />}
                estimatedItemSize={166}
                showsHorizontalScrollIndicator={false}
                horizontal
            /> : <LoadingIcon />}
            </View>
        </View>
    );
}