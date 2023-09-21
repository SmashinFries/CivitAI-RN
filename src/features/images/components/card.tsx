import { View, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import {Image } from 'expo-image'
import { LinearGradient } from "expo-linear-gradient";
import { CivitAIImage } from "../../../app/api/civitai";

type ImageCardProps = {
    item: CivitAIImage;
    index: number;
    width: number;
    maxHeight: number;
};
export const ImageCard = ({index, maxHeight, width, item}:ImageCardProps) => {
    if (!item) {
        return null;
    }

    return(
        <View style={{ borderRadius:12}}>
            <Image source={{uri: item?.url}} contentFit="cover" style={{ aspectRatio:item?.width/item?.height, borderRadius:12, width:width-8, maxHeight:maxHeight,}} />
            <LinearGradient colors={['transparent', '#000']} locations={[0.7, 1]} style={{ aspectRatio:item?.width/item?.height, width:width-8, maxHeight:maxHeight, borderRadius:12, overflow:'hidden', position:'absolute', justifyContent:'flex-end'}}>
                {/* <Text numberOfLines={2} style={{padding:5, color:MD3DarkTheme.colors.onSurface, textAlign:'center'}}>{item.}</Text> */}
            </LinearGradient>
        </View>
    )
}