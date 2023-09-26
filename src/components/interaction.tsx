import { Share, StyleSheet, View } from "react-native";
import { Text, IconButton, useTheme, Divider } from "react-native-paper";
import { downloadImage } from "../utils/images";
import { openWebBrowser } from "../utils/web";

type InteractionBarProps = {
    share_url: string;
    image_url?: string;
    id?: number;
    isSaved: boolean | null | undefined;
    saveItem: () => void;
    removeItem: () => void;
};
export const InteractionBar = ({id, share_url, image_url, isSaved, removeItem, saveItem }:InteractionBarProps) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container]}>
            <Divider />
            <View style={[styles.iconsContainer]}>
                {image_url && <IconButton icon="download-outline" onPress={() => downloadImage(image_url, `civitai_${id}`)} />}
                <IconButton icon="earth" onPress={() => openWebBrowser(share_url)} />
                <IconButton
                    icon="share-variant"
                    onPress={() => Share.share({ url: share_url, message: share_url })}
                />
                <IconButton icon={isSaved ? "bookmark" : "bookmark-outline"} iconColor={isSaved ? colors.primary : undefined} onPress={() => isSaved ? removeItem() : saveItem()} />
            </View>
            <Divider />
        </View>
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