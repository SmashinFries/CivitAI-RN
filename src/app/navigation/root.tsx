import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View } from "react-native";
import ModelStack from "./stacks/model";
import { ImagesStack } from "./stacks/image";
import { RootBtmTabParamList } from "./types";

const BottomTabs = createMaterialBottomTabNavigator<RootBtmTabParamList>();

const Test = () => {
    return(
        <View />
    )
};

const RootBottomTabs = () => {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen name="ModelsStack" options={{tabBarIcon:'database-outline', title:'Models'}} component={ModelStack} />
            <BottomTabs.Screen name="ImagesStack" options={{tabBarIcon:'image-multiple-outline', title:'Images'}} component={ImagesStack} />
            <BottomTabs.Screen name="CreatorsStack" options={{tabBarIcon:'account-outline', title:'Creators'}} component={Test} />
            <BottomTabs.Screen name="MoreStack" options={{tabBarIcon:'dots-horizontal', title:'More'}} component={Test} />
        </BottomTabs.Navigator>
    );
};

export default RootBottomTabs;