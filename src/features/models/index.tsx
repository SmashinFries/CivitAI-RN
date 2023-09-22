import { RefreshControl, ScrollView, View, useWindowDimensions } from "react-native";
import { List, Text } from 'react-native-paper'
import { useModels } from "./hooks/useModels";
import { useCallback, useEffect, useState } from "react";
import { Image } from 'expo-image'
import { ModelSort } from "../../app/api/civitai";
import { FlashList } from "@shopify/flash-list";
import { ModelSection } from "./components/sections";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ModelStackParamList } from "../../app/navigation/types";

const ModelScreen = ({navigation, route}:NativeStackScreenProps<ModelStackParamList, 'Models'>) => {
    const { width, height } = useWindowDimensions();
    const { highestRatedModels, mostDownloadedModels, newestModels, onRefresh, isRefreshing } = useModels();

    useEffect(() => {
        if (!highestRatedModels.results ) {
            console.log("fetching models")
            newestModels.fetchModels({
                page: 1,
                sort: ModelSort.Newest,
                nsfw: false,
            });
            mostDownloadedModels.fetchModels({
                page: 1,
                sort: ModelSort.MostDownloaded,
                nsfw: false,
            });
            highestRatedModels.fetchModels({
                page: 1,
                sort: ModelSort.HighestRated,
                nsfw: false,
            })
        }
    },[highestRatedModels.results])

    return(
        <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />} style={{flex:1, width:width}}>
            <ModelSection title={"Newest"} data={newestModels.results} isLoading={newestModels.loading} />
            <ModelSection title={"Most Downloaded"} data={mostDownloadedModels.results} isLoading={mostDownloadedModels.loading} />
            <ModelSection title={"Top Rated"} data={highestRatedModels.results} isLoading={highestRatedModels.loading} />
        </ScrollView>
    )
};

export default ModelScreen;