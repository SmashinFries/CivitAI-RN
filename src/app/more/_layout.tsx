import { Stack } from "expo-router";

const MoreLayout = () => {
    return(
        <Stack>
            <Stack.Screen name='index' options={{title:'More'}} />
        </Stack>
    );
};

export default MoreLayout;