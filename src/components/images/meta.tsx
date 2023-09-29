import { Pressable, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { copyToClipboard } from '../../utils/clipboard';

type MetaFieldProps = {
    label: string;
    value: string | number | null | undefined;
};
export const MetaField = ({ label, value }: MetaFieldProps) => {
    const { colors } = useTheme();
    if (!value) {
        return null;
    }

    return (
        <Pressable onLongPress={() => copyToClipboard(value)} style={{ margin: 8 }}>
            <TextInput
                mode="outlined"
                outlineStyle={{ borderColor: colors.primary }}
                multiline
                label={label}
                editable={false}
                value={`${value}`}
            />
        </Pressable>
    );
};
