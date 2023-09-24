import { ScrollView, View, useWindowDimensions } from "react-native";
import { useModelQuery } from "../../api/api";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { RefreshControl } from "react-native-gesture-handler";

const ModelDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const {data, isFetching, refetch, isRefetching} = useModelQuery(id);

    return(
        <>
            <Stack.Screen
                options={{
                title: data?.name ?? ''
                }}
            />
            <ScrollView style={{flex:1}} refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}>
                {/* {data?.items[0] ? <View>
                    
                </View> : <ActivityIndicator size={'large'} />} */}
            </ScrollView>
        </>
        
    )
}

export default ModelDetails;