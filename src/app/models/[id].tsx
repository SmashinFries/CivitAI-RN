import { ScrollView, View, useWindowDimensions } from "react-native";
import { useImageIdQuery, useImagesQuery } from "../../api/api";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";

const ModelDetails = () => {
    const windowSize = useWindowDimensions();
    const { id } = useLocalSearchParams<{ id: string }>();

    return(
        <ScrollView style={{flex:1}}>
            {/* {data?.items[0] ? <View>
                
            </View> : <ActivityIndicator size={'large'} />} */}
        </ScrollView>
    )
}

export default ModelDetails;