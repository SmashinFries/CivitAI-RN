import { Stack } from 'expo-router';
import { ImageHeader, PaperHeader } from '../../../components/headers';
export const unstable_settings = {
    initialRouteName: 'index',
};
const ImagesLayout = () => {
    return (
        <Stack
            initialRouteName="index"
            screenOptions={{ headerShown: true, header: (props) => <PaperHeader {...props} /> }}
        >
            <Stack.Screen name="index" options={{ title: 'Images' }} />
            {/* <Stack.Screen name='[id]' options={{title:'Details', header:(props) => <PaperHeader showIcon={false} {...props} />}} /> */}
        </Stack>
    );
};

export default ImagesLayout;
