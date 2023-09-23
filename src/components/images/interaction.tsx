import { Share, StyleSheet, View } from "react-native";
import { Text, IconButton, useTheme, Divider } from "react-native-paper";
import { saveImage } from "../../utils/images";
import { openWebBrowser } from "../../utils/web";

type InteractionBarProps = {
    share_url: string;
    image_url: string;
    id: number | string;
};
export const InteractionBar = ({id, share_url,image_url }:InteractionBarProps) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.container]}>
            <Divider />
            <View style={[styles.iconsContainer]}>
                <IconButton icon="download-outline" onPress={() => saveImage(image_url, `civitai_${id}`)} />
                <IconButton icon="earth" onPress={() => openWebBrowser(share_url)} />
                <IconButton
                    icon="share-variant"
                    onPress={() => Share.share({ url: share_url, message: share_url })}
                />
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