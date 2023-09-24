import { View } from "react-native";
import { CivitAiNSFW } from "../api/civitai";
import { Chip } from "react-native-paper";

type AgeLimits = {
    [key in CivitAiNSFW]: {
        text: string | null;
        color: string | null;
    } | null;
}

// literally took the colors from the site
const ageLimits:AgeLimits = {
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
}

export const NSFWTag = ({nsfw}:{nsfw:CivitAiNSFW}) => {
    const text = ageLimits[nsfw];
    if (!text) return null;
    return(
        <View style={{position:'absolute', borderRadius:12, top:0, left:0}}>
            <Chip style={{backgroundColor:text?.color ?? undefined, borderTopLeftRadius:12, borderBottomRightRadius:12}} textStyle={{fontWeight:'900'}}>{text.text}</Chip>
        </View>
    );
};