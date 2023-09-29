import { Stack } from 'expo-router';
import { PaperHeader } from '../../../components/headers';

const CreatorsLayout = () => {
    return (
        <Stack
            initialRouteName="index"
            screenOptions={{ headerShown: true, header: (props) => <PaperHeader {...props} /> }}
        >
            <Stack.Screen name="index" options={{ title: 'Creators' }} />
            {/* <Stack.Screen name='[id]' options={{title:'Details', header:(props) => <PaperHeader showIcon={false} {...props} />}} /> */}
        </Stack>
    );
};

export default CreatorsLayout;
