import { View } from 'react-native';
import { Text } from 'react-native-paper';

type EmptySavesListProps = {
    tabName: string;
};
export const EmptySavesList = ({ tabName }: EmptySavesListProps) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>No {tabName} added yet!</Text>
        </View>
    );
};
