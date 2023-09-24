import { Stack } from "expo-router";
import { PaperHeader } from "../../../components/headers";

const ModelsLayout = () => {
    return(
        <Stack screenOptions={{title:'Models', header:(props) => <PaperHeader {...props} />}}>
            {/* <Stack.Screen name="[id]" options={{header:(props) => <PaperHeader showIcon={false} {...props} />}} /> */}
        </Stack>
    );
};

export default ModelsLayout;