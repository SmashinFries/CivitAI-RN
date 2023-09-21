import { View, StyleProp, TextStyle } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { VariantProp } from 'react-native-paper/lib/typescript/components/Typography/types';

type ListHeadingProps = {
    title: string;
    titleVariant?: VariantProp<never>;
    subtitle?: string;
    subtitleStyle?: StyleProp<TextStyle>;
    subtitlePress?: () => void;
    style?: StyleProp<TextStyle>;
    icon?: string;
    onIconPress?: () => void;
};
export const ListHeading = ({
    title,
    titleVariant='titleLarge',
    subtitle,
    subtitlePress,
    subtitleStyle,
    style,
    icon,
    onIconPress,
}: ListHeadingProps) => {
    return (
        <View
            style={[
                {
                    padding: 15,
                    paddingBottom: 8,
                    flexDirection: 'row',
                    width: '100%',
                },
                style,
            ]}
        >
            <View>
                <Text variant={titleVariant}>{title}</Text>
                {subtitle ? (
                    <Text
                        variant="titleSmall"
                        onPress={subtitlePress}
                        style={subtitleStyle ?? undefined}
                    >
                        {subtitle}
                    </Text>
                ) : null}
            </View>
            {icon && (
                <View
                    style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                >
                    <IconButton icon={icon} onPress={onIconPress} />
                </View>
            )}
        </View>
    );
};