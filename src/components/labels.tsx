import { View } from 'react-native';
import { CivitAiNSFW } from '../api/civitai';
import { Chip, IconButton, MD3DarkTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type AgeLimits = {
    [key in CivitAiNSFW]: {
        text: string | null;
        color: string | null;
    } | null;
};

// literally took the colors from the site
const ageLimits: AgeLimits = {
    [CivitAiNSFW.None]: null,
    [CivitAiNSFW.Soft]: {
        text: '13+',
        color: 'rgba(252, 196, 25, 0.6)',
    },
    [CivitAiNSFW.Mature]: {
        text: '17+',
        color: 'rgba(247, 103, 7, 0.6)',
    },
    [CivitAiNSFW.X]: {
        text: '18+',
        color: 'rgba(201, 42, 42, 0.6)',
    },
};

export const NSFWTag = ({ nsfw }: { nsfw: CivitAiNSFW }) => {
    const text = ageLimits[nsfw];
    if (!text) return null;
    return (
        <View style={{ position: 'absolute', borderRadius: 12, top: 0, left: 0 }}>
            <Chip
                style={{
                    backgroundColor: text?.color ?? undefined,
                    borderTopLeftRadius: 12,
                    borderBottomRightRadius: 12,
                }}
                textStyle={{ fontWeight: '900' }}
            >
                {text.text}
            </Chip>
        </View>
    );
};

export const HasMetaDataTag = ({ hasMeta, isSaved }: { hasMeta: boolean; isSaved?: boolean }) => {
    if (!hasMeta && !isSaved) return null;
    return (
        <View
            style={{
                position: 'absolute',
                flexDirection: 'row',
                borderRadius: 12,
                bottom: 0,
                right: 10,
                padding: 10,
            }}
        >
            {isSaved && <Icon name="bookmark" size={24} color={MD3DarkTheme.colors.onBackground} />}
            {hasMeta && (
                <Icon
                    name="information-outline"
                    size={24}
                    color={MD3DarkTheme.colors.onBackground}
                />
            )}
        </View>
    );
};
