import { Stack } from "expo-router";
import { PaperHeader } from "../../../components/headers";

const MoreLayout = () => {
    return(
        <Stack screenOptions={{title:'More', animation:'slide_from_bottom', header: props => <PaperHeader {...props} showIcon={false} />}}>
            {/* <Stack.Screen name='index' options={{title:'More'}} /> */}
        </Stack>
    );
};

export default MoreLayout;