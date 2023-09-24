import { Pressable, View } from "react-native";
import { Image } from 'expo-image';
import { Text, MD3DarkTheme, IconButton, useTheme } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import { CivitAIModelItem } from "../../api/civitai";
import { useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import { MD3Colors } from "react-native-paper/lib/typescript/types";
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from "expo-router";

type ModelCardProps = {
    item: CivitAIModelItem;
    themeColors: MD3Colors;
    index: number;
};
export const ModelCard = ({item, themeColors}:ModelCardProps) => {
    const [isBlur, setIsBlur] = useState<boolean>(true);
    
    if (!item || !item?.modelVersions[0]?.images[0]?.url) {
        return null;
    }

    return(
        <Link href={`/models/${item.id}`} asChild>
        <Pressable onLongPress={() => setIsBlur(prev => !prev)} style={{margin:8, height:280}}>
            <View style={{borderRadius:12, backgroundColor:themeColors.onSurfaceVariant}}>
                <Image source={{uri: item?.modelVersions[0]?.images[0]?.url}} blurRadius={ item.nsfw && isBlur ? 200 : 0} transition={800} style={{ borderRadius:12, overflow:'hidden', width:160, height:230}} />
            </View>
                {/* <LinearGradient colors={['transparent', '#000']} locations={[0.7, 1]} style={{ borderRadius:12, overflow:'hidden', position:'absolute', justifyContent:'flex-end', alignItems:'center', width:150, height:220}}>
            
            </LinearGradient> */}
            {item.stats.downloadCount ? <View style={{position:'absolute', flexDirection:'row', alignItems:'center', padding:5, borderTopRightRadius:12, borderBottomLeftRadius:12, right:0, top:0, backgroundColor: themeColors.primaryContainer}}>
                <MaterialCommunityIcons name="download" size={18} />
                <Text style={{color:themeColors.onPrimaryContainer}}>{item.stats.downloadCount?.toLocaleString()}</Text>
            </View> : null}
            <Text numberOfLines={2} style={{padding:5, width:150, textAlign:'center'}}>{item.name}</Text>
        </Pressable>
        </Link>
    )
};