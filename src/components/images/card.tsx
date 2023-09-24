import { Pressable, View, useWindowDimensions } from "react-native";
import { Chip, Text } from "react-native-paper";
import {Image } from 'expo-image'
import { LinearGradient } from "expo-linear-gradient";
import { CivitAIImage, CivitAiNSFW, ModelImagesItem } from "../../api/civitai";
import { useEffect, useState } from "react";
import { NSFWTag } from "../labels";

type ImageCardProps = {
    item: CivitAIImage;
    index: number;
    width: number;
    maxHeight: number;
};
export const ImageCard = ({index, maxHeight, width, item}:ImageCardProps) => {
    const [isBlur, setIsBlur] = useState<boolean>(true);
    if (!item) {
        return null;
    }

    return(
        <Pressable onLongPress={() => console.log('test')} style={{ borderRadius:12}}>
            <Image source={{uri: item?.url}} blurRadius={ item.nsfw && isBlur ? 200 : 0} transition={800} contentFit="cover" style={{ aspectRatio:item?.width/item?.height, borderRadius:12, width:width-8, maxHeight:maxHeight,}} />
            {/* <LinearGradient colors={['transparent', '#000']} locations={[0.7, 1]} style={{ aspectRatio:item?.width/item?.height, width:width-8, maxHeight:maxHeight, borderRadius:12, overflow:'hidden', position:'absolute', justifyContent:'flex-end'}}>
                <Text numberOfLines={2} style={{padding:5, color:MD3DarkTheme.colors.onSurface, textAlign:'center'}}>{item.}</Text>
            </LinearGradient> */}
            <NSFWTag nsfw={item.nsfwLevel} />
        </Pressable>
    )
}

type ModelImageCardProps = {
    item: ModelImagesItem;
    index: number;
    width: number;
    maxHeight: number;
};
export const ModelImageCard = ({index, maxHeight, width, item}:ModelImageCardProps) => {
    // using isBlur value would be wrong after scrolling so instead use useEffect to set it
    const [isBlur, setIsBlur] = useState<boolean>(true);
    if (!item) {
        return null;
    }

    return(
        <Pressable onPress={() => setIsBlur(prev => !prev)} style={{ borderRadius:12}}>
            <Image source={{uri: item?.url}} blurRadius={item.nsfw !== CivitAiNSFW.None && isBlur ? 200 : 0} transition={{effect:'cross-dissolve', duration:800}} contentFit="cover" style={{ aspectRatio:item?.width/item?.height, borderRadius:12, width:width-8, maxHeight:maxHeight,}} />
            {/* <LinearGradient colors={['transparent', '#000']} locations={[0.7, 1]} style={{ aspectRatio:item?.width/item?.height, width:width-8, maxHeight:maxHeight, borderRadius:12, overflow:'hidden', position:'absolute', justifyContent:'flex-end'}}>
                <Text numberOfLines={2} style={{padding:5, color:MD3DarkTheme.colors.onSurface, textAlign:'center'}}>{item.}</Text>
            </LinearGradient> */}
            <NSFWTag nsfw={item.nsfw} />
        </Pressable>
    )
}