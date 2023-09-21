import { ScrollView, View } from "react-native";
import { Text, IconButton, useTheme, Divider, Badge, Avatar } from "react-native-paper";
import { saveImage } from "../../utils/images";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ModelStackParamList } from "../../app/navigation/types";

export const ModelDetails = ({navigation, route}:NativeStackScreenProps<ModelStackParamList, 'ModelDetails'>) => {
    const { colors } = useTheme();
    const { id } = route.params;
    return(
        <ScrollView>

        </ScrollView>
    );
};