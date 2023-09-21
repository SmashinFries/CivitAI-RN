import { Pressable, View, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { MasonryFlashList } from "@shopify/flash-list";
import { useImagesQuery } from "../../app/api/api";
import { CivitAIImage, Period } from "../../app/api/civitai";
import { useCallback, useEffect, useState } from "react";
import { ImageCard } from "./components/card";
import Animated from "react-native-reanimated";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageStackParamList } from "../../app/navigation/types";

export const ImagesScreen = ({navigation, route}:NativeStackScreenProps<ImageStackParamList, 'Images'>) => {
    const { width, height } = useWindowDimensions();
    const { fetchImages, loading, results} = useImagesQuery();
    const [ page, setPage ] = useState(1);

    const keyExtractor = useCallback((item:CivitAIImage, index:number) => index.toString(),[]);

    const RenderItem = useCallback((props:{item:CivitAIImage, index:number}) => {
        return(
            <Pressable onPress={() => navigation.navigate('ImageDetails', {height: props.item.height, width: props.item.width, img_url: props.item.url, id:props.item.id})} style={{margin:5}}>
                <Animated.View style={{width:width/2, maxHeight:height/2}} sharedTransitionTag="ImageDetail">
                    <ImageCard {...props} maxHeight={height/2} width={width/2}  />
                </Animated.View>
            </Pressable>
            
        );
    },[width, height])

    const loadMore = () => {
        if (results) {
            if (results?.metadata?.currentPage < results?.metadata?.totalPages) {
                console.log("Loading more images...");
                fetchImages({
                    limit: 30,
                    nsfw: "None",
                    sort: "Most Reactions",
                    period: Period.Month,
                    page: results?.metadata.currentPage + 1
                });
            }
        }
    };

    useEffect(() => {
        if (!results) {
            fetchImages({
                limit: 30,
                nsfw: "None",
                sort: "Most Reactions",
                period: Period.Month
            });
        }
    },[results])

    return(
        <View style={{ width: '100%', flex: 1 }}>
            {results && <MasonryFlashList 
                data={results?.items}
                keyExtractor={keyExtractor}
                renderItem={RenderItem}
                numColumns={2}
                estimatedItemSize={271}
                onEndReached={loadMore}
                onEndReachedThreshold={0.7}
            />}
        </View>
    );
};