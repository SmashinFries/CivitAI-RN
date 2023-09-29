import React, { useCallback, useEffect, useState } from 'react';
import {
    Appbar,
    Avatar,
    Button,
    IconButton,
    Menu,
    Portal,
    Searchbar,
    Text,
    useTheme,
} from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    Keyboard,
    RefreshControlProps,
    Share,
    ToastAndroid,
    View,
    useWindowDimensions,
} from 'react-native';
// import {} from 'react'
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { CivitAIImagesParams, CivitAiImageSort } from '../api/civitai';

export const PaperHeader = ({
    navigation,
    options,
    route,
    back,
    showIcon = true,
}: NativeStackHeaderProps & { showIcon?: boolean }) => {
    const title = getHeaderTitle(options, route.name);
    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            {showIcon && (
                <Avatar.Image
                    size={32}
                    style={{ backgroundColor: 'transparent', marginHorizontal: 8 }}
                    source={{
                        uri: 'https://github.com/civitai/civitai/blob/main/public/images/favicon-32x32.png?raw=true',
                    }}
                />
            )}
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
};

export const ImagesHeader = ({
    navigation,
    options,
    route,
    back,
    sort,
    updateSort,
}: NativeStackHeaderProps & {
    sort: CivitAiImageSort;
    updateSort: (newSort: CivitAiImageSort) => void;
}) => {
    const title = getHeaderTitle(options, route.name);
    const [visible, setVisible] = useState(false);
    const menuOptions = Object.values(CivitAiImageSort);

    const openMenu = () => setVisible(true);
    const onMenuItemPress = (item: CivitAiImageSort) => {
        updateSort(item);
        setVisible(false);
    };

    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            <Avatar.Image
                size={32}
                style={{ backgroundColor: 'transparent', marginHorizontal: 8 }}
                source={{
                    uri: 'https://github.com/civitai/civitai/blob/main/public/images/favicon-32x32.png?raw=true',
                }}
            />
            <Appbar.Content title={title} />
            <View>
                <Menu
                    visible={visible}
                    anchorPosition="bottom"
                    onDismiss={() => setVisible(false)}
                    anchor={<Button onPress={openMenu}>{sort}</Button>}
                >
                    {menuOptions.map((item, index) => (
                        <Menu.Item
                            key={index}
                            leadingIcon={item === sort ? 'check' : undefined}
                            onPress={() => onMenuItemPress(item)}
                            title={item}
                        />
                    ))}
                </Menu>
            </View>
        </Appbar.Header>
    );
};
