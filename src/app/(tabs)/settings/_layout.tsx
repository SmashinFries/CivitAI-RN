import { Stack } from 'expo-router';
import { PaperHeader } from '../../../components/headers';

const SettingsLayout = () => {
    return (
        <Stack
            screenOptions={{
                title: 'Settings',
                animation: 'slide_from_bottom',
                header: (props) => <PaperHeader {...props} showIcon={false} />,
            }}
        >
            {/* <Stack.Screen name='index' options={{title:'More'}} /> */}
        </Stack>
    );
};

export default SettingsLayout;
