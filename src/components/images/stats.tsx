import { Share, StyleSheet, View } from "react-native";
import { Text, IconButton, useTheme, Divider, Badge, Avatar } from "react-native-paper";
import { saveImage } from "../../../utils/images";
import { openWebBrowser } from "../../../utils/web";
import { CivitAIImageStats } from "../../../api/civitai";

type StatItemProps = {
    text: string | number;
    emoji?: string;
    icon: string;
};
export const StatItem = ({icon, emoji, text}:StatItemProps) => {
    const { colors } = useTheme();
    if (!text) {
        return null;
    }
    return(
        <View style={{flexDirection:'column', alignItems:'center'}}>
            {!emoji ? <IconButton icon={icon} /> : <Avatar.Text size={35} style={{backgroundColor:'transparent'}} label={emoji} />}
            {/* <Text>{text}</Text> */}
            <Badge style={{position:'absolute', top:-2, right:-2, backgroundColor:colors.primary}}>{text}</Badge>
        </View>
    );
};

export const EmojiItem = ({emoji, text}:{emoji:string, text:string | number}) => {
    const { colors } = useTheme();
    if (!text) {
        return null;
    }
    return(
        <View style={{flexDirection:'column', alignItems:'center',}}>
            <Avatar.Text size={36} style={{backgroundColor:'transparent'}} label={emoji} />
            <Badge style={{position:'absolute', top:-10, right:-10, backgroundColor:colors.primary}}>{text}</Badge>
        </View>
    );
};

export const StatsBar = (props:CivitAIImageStats|undefined) => {
    const { colors } = useTheme();

    if (!props) {
        return null;
    }

    return (
        <View style={[styles.container]}>
            <View style={[styles.iconsContainer]}>
                <EmojiItem emoji={"❤️"} text={props.heartCount} />
                <EmojiItem emoji="😂" text={props.laughCount} />
                <EmojiItem emoji="😭" text={props.cryCount} />
                <StatItem icon={"thumb-up-outline"} text={props.likeCount} />
                <StatItem icon={"thumb-down-outline"} text={props.dislikeCount} />
                <StatItem icon={"comment-outline"} text={props.commentCount} />
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
        alignItems:'center',
    },
});