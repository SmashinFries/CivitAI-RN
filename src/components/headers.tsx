import React, { useCallback, useEffect, useState } from 'react';
import {
    Appbar,
    Avatar,
    Button,
    IconButton,
    Portal,
    Searchbar,
    Text,
    useTheme
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

export const PaperHeader = ({ navigation, options, route, back, showIcon=true }: NativeStackHeaderProps & {showIcon?:boolean}) => {
    const title = getHeaderTitle(options, route.name);
    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            {showIcon && <Avatar.Image size={32} style={{backgroundColor:'transparent', marginHorizontal:8}} source={{uri: 'https://github.com/civitai/civitai/blob/main/public/images/favicon-32x32.png?raw=true'}} />}
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
};

export const ImageHeader = ({ navigation, options, route, back }: NativeStackHeaderProps) => {
    const title = getHeaderTitle(options, route.name);
    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            <Appbar.Content title={title} />
        </Appbar.Header>
    );
};