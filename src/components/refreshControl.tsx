import { RefreshControl, RefreshControlProps } from 'react-native';
import { useTheme } from 'react-native-paper';

export const ThemedRefreshControl = (props: RefreshControlProps) => {
    const { colors } = useTheme();
    return (
        <RefreshControl
            {...props}
            progressBackgroundColor={colors.primaryContainer}
            tintColor={colors.onPrimaryContainer}
        />
    );
};
