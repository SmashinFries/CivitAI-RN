import { Stack } from 'expo-router';
import { PaperHeader } from '../../../components/headers';

const SavesLayout = () => {
    return (
        <Stack screenOptions={{ title: 'Saves', header: (props) => <PaperHeader {...props} /> }}>
            {/* <Stack.Screen name="[id]" options={{header:(props) => <PaperHeader showIcon={false} {...props} />}} /> */}
        </Stack>
    );
};

export default SavesLayout;
