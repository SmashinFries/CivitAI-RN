import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import ModelScreen from "../../../features/models";
import { PaperHeader } from "../../../components/headers";
import { ModelDetails } from "../../../features/models/modelDetails";
import { ModelStackParamList } from "../types";

const Stack = createNativeStackNavigator<ModelStackParamList>();

const ModelStack = () => {
    return(
        <Stack.Navigator screenOptions={{animation:'slide_from_bottom', header:(props) => <PaperHeader {...props} />}}>
            <Stack.Screen name="Models" component={ModelScreen} />
            <Stack.Screen name="ModelDetails" component={ModelDetails} />
        </Stack.Navigator>
    );
};

export default ModelStack