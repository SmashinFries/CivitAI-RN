import { Pressable, Share, StyleSheet, View } from 'react-native';
import { Text, IconButton, useTheme, Divider, Avatar } from 'react-native-paper';
import { downloadImage } from '../utils/images';
import { openWebBrowser } from '../utils/web';
import { useState } from 'react';

type InteractionBarProps = {
    share_url: string;
    image_url?: string;
    id?: number;
    isSaved: boolean | null | undefined;
    saveItem: () => void;
    removeItem: () => void;
};
export const InteractionBar = ({
    id,
    share_url,
    image_url,
    isSaved,
    removeItem,
    saveItem,
}: InteractionBarProps) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container]}>
            <Divider />
            <View style={[styles.iconsContainer]}>
                {image_url && (
                    <IconButton
                        icon="download-outline"
                        onPress={() => downloadImage(image_url, `civitai_${id}`)}
                    />
                )}
                <IconButton icon="earth" onPress={() => openWebBrowser(share_url)} />
                <IconButton
                    icon="share-variant"
                    onPress={() => Share.share({ url: share_url, message: share_url })}
                />
                <IconButton
                    icon={isSaved ? 'bookmark' : 'bookmark-outline'}
                    iconColor={isSaved ? colors.primary : undefined}
                    onPress={() => (isSaved ? removeItem() : saveItem())}
                />
            </View>
            <Divider />
        </View>
    );
};

type UserBarProps = {
    username: string;
    user_img: string;
};
export const UserBar = ({ username, user_img }: UserBarProps) => {
    const [totalHeight, setTotalHeight] = useState<number>(0);
    const { colors } = useTheme();
    const user_profile = `https://civitai.com/user/${username}`;
    return (
        <Pressable
            onPress={() => openWebBrowser(user_profile)}
            style={[
                {
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: 20,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                },
            ]}
        >
            {user_img ? (
                <Avatar.Image size={totalHeight} source={{ uri: user_img }} />
            ) : (
                <Avatar.Text
                    size={totalHeight}
                    labelStyle={{ textTransform: 'capitalize' }}
                    label={username}
                />
            )}
            <View
                onLayout={(e) => setTotalHeight(e.nativeEvent.layout.height)}
                style={[{ marginHorizontal: 10 }]}
            >
                <Text variant="titleMedium">{username?.length > 0 ? username : '???'}</Text>
                <Text
                    numberOfLines={1}
                    style={{ color: colors.onSurfaceVariant }}
                    variant="titleSmall"
                >
                    {user_profile}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    iconsContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-evenly',
    },
});
