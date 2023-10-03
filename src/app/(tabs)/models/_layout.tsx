import { Stack } from 'expo-router';
import { ModelHeader, ModelSearchHeader, PaperHeader } from '../../../components/headers';

const ModelsLayout = () => {
    return (
        <Stack screenOptions={{ title: 'Models', header: (props) => <PaperHeader {...props} /> }}>
            <Stack.Screen
                name="index"
                options={{ header: (props) => <ModelHeader {...props} /> }}
            />
            <Stack.Screen name="search" options={{ animation: 'none', headerShown: false }} />
        </Stack>
    );
};

export default ModelsLayout;
