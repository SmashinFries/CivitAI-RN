import { Stack } from 'expo-router';
import { PaperHeader } from '../../../components/headers';

const ImageLayout = () => {
    return (
        <Stack
            screenOptions={{
                animation: 'slide_from_bottom',
                headerShown: false,
                header: (props) => <PaperHeader {...props} showIcon={false} />,
            }}
        />
    );
};

export default ImageLayout;
