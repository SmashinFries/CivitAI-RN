import React, { useState } from 'react';
import { Appbar, Avatar, Button, Menu, Searchbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { CivitAiImageSort } from '../api/civitai';
import { ModelSearchDrawer } from './models/search/drawer';

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

export const ModelHeader = ({
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
            <Appbar.Action icon={'magnify'} onPress={() => navigation.navigate('search')} />
        </Appbar.Header>
    );
};

type ModelSearchHeaderProps = NativeStackHeaderProps & {
    toggleDrawer: () => void;
    search: string;
    updateSearch: (newSearch: string) => void;
    onSearch: (txt: string) => void;
};
export const ModelSearchHeader = ({
    navigation,
    options,
    route,
    back,
    toggleDrawer,
    updateSearch,
    onSearch,
    search,
}: ModelSearchHeaderProps) => {
    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            <Searchbar
                value={search}
                onIconPress={() => onSearch(search)}
                onClearIconPress={() => {
                    updateSearch('');
                    onSearch('');
                }}
                onChangeText={(txt) => updateSearch(txt)}
                onSubmitEditing={(e) => onSearch(e.nativeEvent.text)}
                style={{ flex: 1 }}
            />
            <Appbar.Action icon={'filter-outline'} onPress={toggleDrawer} />
            {/* <ModelSearchDrawer open={open} onOpen={onOpen} onClose={onClose} /> */}
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
