import { useState } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import {
    Appbar,
    Button,
    Portal,
    Text,
    Drawer,
    useTheme,
    Menu,
    IconButton,
    Switch,
    Searchbar,
    TextInput,
} from 'react-native-paper';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ModelSort, ModelTypes, Period } from '../../../api/civitai';
import { ModelSearch } from '../../../hooks/models/search/useModelSearch';
import { ScrollView } from 'react-native-gesture-handler';

type DrawerMenuButtonProps = {
    selection: string;
    options: string[];
    onPress: (item: ModelTypes | ModelSort | Period) => void;
};
const DrawerMenuButton = ({ selection, options, onPress }: DrawerMenuButtonProps) => {
    const [open, setOpen] = useState(false);
    if (!options) return null;
    return (
        <Menu
            onDismiss={() => setOpen(false)}
            visible={open}
            anchor={
                <Button
                    mode="outlined"
                    compact
                    style={{ marginHorizontal: 10 }}
                    onPress={() => setOpen(true)}
                >
                    {selection}
                </Button>
            }
        >
            {options.map((item, idx) => (
                <Menu.Item
                    key={idx}
                    onPress={() => {
                        onPress(item);
                        setOpen(false);
                    }}
                    title={item}
                />
            ))}
        </Menu>
    );
};

type DrawerSearchbarProps = {
    label?: string;
    query: string;
    placeholder?: string;
    onChange: (query: string) => void;
};
const DrawerSearchbar = ({ query, label, placeholder, onChange }: DrawerSearchbarProps) => {
    return (
        <View style={{ paddingVertical: 20 }}>
            <TextInput
                label={label}
                dense
                right={query && <TextInput.Icon icon="close" onPress={() => onChange('')} />}
                mode="outlined"
                placeholder={placeholder}
                contentStyle={{ justifyContent: 'center' }}
                style={{ marginHorizontal: 10 }}
                value={query}
                onChangeText={(txt) => onChange(txt)}
            />
        </View>
    );
};

type ModelSearchDrawerProps = {
    open: boolean;
    toggleDrawer: () => void;
    tag: ModelSearch['tagQuery'];
    onTagChange: ModelSearch['updateTag'];
    username: ModelSearch['usernameQuery'];
    onUsernameChange: ModelSearch['updateUserName'];
    nsfw: ModelSearch['nsfw'];
    onNsfwChange: ModelSearch['updateNsfw'];
    type: ModelSearch['modelType'];
    onTypeChange: ModelSearch['updateModelType'];
    period: ModelSearch['period'];
    onPeriodChange: ModelSearch['updatePeriod'];
    sort: ModelSearch['sort'];
    onSortChange: ModelSearch['updateSort'];
    search: ModelSearch['searchQuery'];
    onSearchChange: ModelSearch['updateSearch'];
    onSearchPress: ModelSearch['onSearchPress'];
};
export const ModelSearchDrawer = (props: ModelSearchDrawerProps) => {
    const { colors } = useTheme();
    return (
        <Portal>
            {props.open && (
                <>
                    <Animated.View entering={FadeIn} exiting={FadeOut}>
                        <Pressable
                            style={{
                                backgroundColor: 'rgba(0,0,0,.3)',
                                width: '100%',
                                height: '100%',
                            }}
                            onPress={props.toggleDrawer}
                        />
                    </Animated.View>
                    <Animated.View
                        entering={SlideInRight}
                        exiting={SlideOutRight}
                        style={{
                            position: 'absolute',
                            height: '100%',
                            minWidth: '70%',
                            maxWidth: '90%',
                            right: 0,
                            backgroundColor: colors.surface,
                        }}
                    >
                        <SafeAreaView>
                            <ScrollView
                                keyboardShouldPersistTaps="never"
                                keyboardDismissMode="interactive"
                            >
                                <Drawer.Item label="Types" />
                                <DrawerMenuButton
                                    selection={props.type}
                                    options={Object.values(ModelTypes)}
                                    onPress={(item) => props.onTypeChange(item)}
                                />
                                <Drawer.Item label="Period" />
                                <DrawerMenuButton
                                    selection={props.period}
                                    options={Object.values(Period)}
                                    onPress={(item) => props.onPeriodChange(item)}
                                />
                                <Drawer.Item label="Sort" />
                                <DrawerMenuButton
                                    selection={props.sort}
                                    options={Object.values(ModelSort)}
                                    onPress={(item) => props.onSortChange(item)}
                                />
                                {/* <Drawer.Item
                                label="Rating"
                            /> */}
                                <DrawerSearchbar
                                    label="Username"
                                    query={props.username}
                                    placeholder="Enter a username"
                                    onChange={(txt) => props.onUsernameChange(txt)}
                                />
                                <DrawerSearchbar
                                    label="Tag"
                                    query={props.tag}
                                    placeholder="Enter a tag"
                                    onChange={(txt) => props.onTagChange(txt)}
                                />
                                <Drawer.Item
                                    label="NSFW"
                                    right={() => (
                                        <Switch
                                            value={props.nsfw}
                                            onValueChange={(val) => props.onNsfwChange(val)}
                                        />
                                    )}
                                />
                                <Button
                                    mode="contained"
                                    onPress={() => {
                                        props.onSearchPress();
                                        props.toggleDrawer();
                                    }}
                                    style={{ margin: 10 }}
                                >
                                    Search
                                </Button>
                            </ScrollView>
                        </SafeAreaView>
                    </Animated.View>
                </>
            )}
        </Portal>
    );
};
