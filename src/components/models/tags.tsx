import { Chip } from 'react-native-paper';
import { View } from 'react-native';

const ModelTag = (tag: string) => {
    return <Chip>{tag}</Chip>;
};

type ModelVersionTagProps = {
    name: string;
    isSelected?: boolean;
    onPress: () => void;
};
export const ModelVersionTag = ({ name, isSelected, onPress }: ModelVersionTagProps) => {
    return (
        <Chip onPress={onPress} selected={isSelected}>
            {name}
        </Chip>
    );
};

type ModelTagsProps = {
    name: string;
    // could add search functionality here at some point
    onPress?: () => void;
};
export const ModelTags = ({ name }: ModelTagsProps) => {
    return <Chip>{name}</Chip>;
};
