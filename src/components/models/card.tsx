import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import { Text, MD3DarkTheme, IconButton, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { CivitAIModelItem, CivitAIModelVersionsItem } from '../../api/civitai';
import { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import { useSettingsStore } from '../../store';
import { useNsfwBlur } from '../../hooks/useNsfwBlur';

type ModelCardProps = {
    item: CivitAIModelItem;
    isSaved?: boolean;
    index: number;
};
export const ModelCard = ({ item, isSaved }: ModelCardProps) => {
    const { colors } = useTheme();
    const { blurAmount, toggleBlur } = useNsfwBlur(undefined);

    if (!item || !item?.modelVersions[0]?.images[0]?.url) {
        return null;
    }

    return (
        <View style={{ width: 160, margin: 8 }}>
            <Link href={`/model/${item.id}`} asChild>
                <Pressable onLongPress={toggleBlur} style={{ height: 240 }}>
                    <View style={{ borderRadius: 12, backgroundColor: colors.onSurfaceVariant }}>
                        <Image
                            source={{ uri: item?.modelVersions[0]?.images[0]?.url }}
                            blurRadius={blurAmount}
                            transition={800}
                            style={{
                                borderRadius: 12,
                                overflow: 'hidden',
                                width: 160,
                                height: 240,
                            }}
                        />
                    </View>
                    <LinearGradient
                        colors={['transparent', '#000']}
                        locations={[0.7, 1]}
                        style={{
                            borderRadius: 12,
                            overflow: 'hidden',
                            position: 'absolute',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            width: 160,
                            height: 240,
                        }}
                    >
                        <Text
                            numberOfLines={2}
                            style={{
                                padding: 5,
                                color: MD3DarkTheme.colors.onBackground,
                                width: 160,
                                textAlign: 'center',
                            }}
                        >
                            {item.name}
                        </Text>
                    </LinearGradient>
                    {item.stats.downloadCount ? (
                        <View
                            style={{
                                position: 'absolute',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 5,
                                borderTopRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                right: 0,
                                top: 0,
                                backgroundColor: colors.primaryContainer,
                            }}
                        >
                            <MaterialCommunityIcons
                                color={colors.onPrimaryContainer}
                                name="download"
                                size={18}
                            />
                            <Text style={{ color: colors.onPrimaryContainer }}>
                                {item.stats.downloadCount?.toLocaleString()}
                            </Text>
                        </View>
                    ) : null}
                    {isSaved ? (
                        <View
                            style={{
                                position: 'absolute',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 5,
                                borderTopLeftRadius: 12,
                                borderBottomRightRadius: 12,
                                left: 0,
                                top: 0,
                            }}
                        >
                            <MaterialCommunityIcons
                                color={MD3DarkTheme.colors.onBackground}
                                name="bookmark"
                                size={18}
                            />
                        </View>
                    ) : null}
                </Pressable>
            </Link>
            <Text
                numberOfLines={1}
                variant="labelMedium"
                style={{ padding: 5, color: colors.onSurfaceVariant, textAlign: 'center' }}
            >
                {item.type}
            </Text>
        </View>
    );
};

type ModelResourceCard = {
    item: CivitAIModelVersionsItem | undefined;
    isSaved?: boolean;
    index: number;
};
export const ModelResourceCard = ({ item, isSaved }: ModelResourceCard) => {
    const { colors } = useTheme();
    const { blurAmount, toggleBlur } = useNsfwBlur(undefined);

    if (!item || !item?.images[0]?.url) {
        return null;
    }

    return (
        <View style={{ width: 160, margin: 8 }}>
            <Link href={`/model/${item?.modelId}`} asChild>
                <Pressable onLongPress={toggleBlur} style={{ height: 240 }}>
                    <View style={{ borderRadius: 12, backgroundColor: colors.onSurfaceVariant }}>
                        <Image
                            source={{ uri: item?.images[0]?.url }}
                            blurRadius={blurAmount}
                            transition={800}
                            style={{
                                borderRadius: 12,
                                overflow: 'hidden',
                                width: 160,
                                height: 240,
                            }}
                        />
                    </View>
                    <LinearGradient
                        colors={['transparent', '#000']}
                        locations={[0.7, 1]}
                        style={{
                            borderRadius: 12,
                            overflow: 'hidden',
                            position: 'absolute',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            width: 160,
                            height: 240,
                        }}
                    >
                        <Text
                            numberOfLines={2}
                            style={{
                                padding: 5,
                                color: MD3DarkTheme.colors.onBackground,
                                width: 160,
                                textAlign: 'center',
                            }}
                        >
                            {item.model.name}
                        </Text>
                    </LinearGradient>
                    {item.stats.downloadCount ? (
                        <View
                            style={{
                                position: 'absolute',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 5,
                                borderTopRightRadius: 12,
                                borderBottomLeftRadius: 12,
                                right: 0,
                                top: 0,
                                backgroundColor: colors.primaryContainer,
                            }}
                        >
                            <MaterialCommunityIcons
                                color={colors.onPrimaryContainer}
                                name="download"
                                size={18}
                            />
                            <Text style={{ color: colors.onPrimaryContainer }}>
                                {item.stats.downloadCount?.toLocaleString()}
                            </Text>
                        </View>
                    ) : null}
                    {isSaved ? (
                        <View
                            style={{
                                position: 'absolute',
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 5,
                                borderTopLeftRadius: 12,
                                borderBottomRightRadius: 12,
                                left: 0,
                                top: 0,
                            }}
                        >
                            <MaterialCommunityIcons
                                color={colors.onBackground}
                                name="bookmark"
                                size={18}
                            />
                        </View>
                    ) : null}
                </Pressable>
            </Link>
            <Text
                numberOfLines={1}
                variant="labelMedium"
                style={{ padding: 5, color: colors.onSurfaceVariant, textAlign: 'center' }}
            >
                {item?.model?.type} · {item?.baseModel}
            </Text>
        </View>
    );
};
