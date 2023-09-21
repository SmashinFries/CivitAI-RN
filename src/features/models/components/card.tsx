import { View } from "react-native";
import { Image } from 'expo-image';
import { Text, MD3DarkTheme } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import { CivitAIModelItem } from "../../../app/api/civitai";
import { useState } from "react";
import { useSharedValue } from "react-native-reanimated";

type ModelCardProps = {
    item: CivitAIModelItem;
    index: number;
};
export const ModelCard = ({item}:ModelCardProps) => {
    if (!item) {
        return null;
    }

    return(
        <View style={{margin:8, borderRadius:12}}>
            <Image source={{uri: item?.modelVersions[0]?.images[0]?.url}} style={{ borderRadius:12, overflow:'hidden', width:150, height:220}} />
            <LinearGradient colors={['transparent', '#000']} locations={[0.7, 1]} style={{ borderRadius:12, overflow:'hidden', position:'absolute', justifyContent:'flex-end', alignItems:'center', width:150, height:220}}>
                <View style={{flexDirection:'row',}}>
                    <Text style={{color:MD3DarkTheme.colors.onSurface}}>{item.stats.downloadCount}</Text>
                </View>
            </LinearGradient>
            <Text numberOfLines={2} style={{padding:5, width:150, textAlign:'center'}}>{item.name}</Text>
        </View>
    )
};