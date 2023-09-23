import { ImageHeader, PaperHeader } from "../../../components/headers";
import { ImagesScreen } from "../../../features/images";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ImageDetails } from "../../../features/images/imageDetails";
import { ImageStackParamList } from "../types";

const Stack = createNativeStackNavigator<ImageStackParamList>();

export const ImagesStack = () => {
    return(
        <Stack.Navigator screenOptions={{ header: props => <PaperHeader {...props} />}}>
            <Stack.Screen name="Images" component={ImagesScreen} />
            <Stack.Screen name="ImageDetails" component={ImageDetails} options={{title:'', header:(props) => <ImageHeader {...props} />}} />
        </Stack.Navigator>
    );
};