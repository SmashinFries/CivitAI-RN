import { ScrollView, View, useWindowDimensions } from "react-native";
import { useImageIdQuery, useImagesQuery, useModelQuery } from "../../api/api";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { RefreshControl } from "react-native-gesture-handler";

const ModelDetails = () => {
    const windowSize = useWindowDimensions();
    const { id } = useLocalSearchParams<{ id: string }>();
    const {data, isFetching, refetch, isRefetching} = useModelQuery(id);

    return(
        <ScrollView style={{flex:1}} refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>
            {/* {data?.items[0] ? <View>
                
            </View> : <ActivityIndicator size={'large'} />} */}
        </ScrollView>
    )
}

export default ModelDetails;