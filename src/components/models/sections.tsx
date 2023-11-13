import { ActivityIndicator, View, useWindowDimensions } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { CivitAIModelItem, CivitAIModelSearch, ModelTypes } from '../../api/civitai';
import { useCallback, useState } from 'react';
import { ModelCard } from './card';
import { ListHeading } from '../text';
import { LoadingIcon } from '../loading';
import { useSaveStore } from '../../store';
import { copyToClipboard } from '../../utils/clipboard';

type ModelSectionProps = {
    data: CivitAIModelSearch | undefined;
    isLoading: boolean;
    title: string;
};
export const ModelSection = ({ data, isLoading, title }: ModelSectionProps) => {
    const { width, height } = useWindowDimensions();
    const { colors } = useTheme();
    const { models } = useSaveStore();

    const keyExtractor = useCallback(
        (item: CivitAIModelItem, index: number) => index.toString(),
        [],
    );

    return (
        <View style={{ paddingVertical: 5 }}>
            <ListHeading title={title} titleVariant="headlineMedium" />
            <View style={{ maxHeight: 300, minHeight: 250 }}>
                    <FlashList
                        data={data?.items}
                        keyExtractor={keyExtractor}
                        renderItem={(props) => (
                            <ModelCard
                                isSaved={
                                    models?.find((value) => value.id === props.item.id)
                                        ? true
                                        : false
                                }
                                {...props}
                            />
                        )}
                        estimatedItemSize={166}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    />
            </View>
        </View>
    );
};

const ListItem = ({ title, value }: { title: string; value: string | ModelTypes }) => {
    if (!value) {
        return null;
    }
    return (
        <List.Item
            title={title}
            onPress={() => copyToClipboard(value)}
            right={(props) => (
                <Text
                    style={[
                        props.style,
                        { color: props.color, maxWidth: '60%', textAlign: 'right' },
                    ]}
                >
                    {value}
                </Text>
            )}
        />
    );
};

type ModelInfoProps = {
    type: ModelTypes;
    downloads: number;
    uploaded: string;
    baseModel: string;
    triggerWords: string[];
    air: string;
};
export const ModelInfo = (items: ModelInfoProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    return (
        <View style={{ marginTop: 15 }}>
            <List.Accordion
                title="Details"
                onPress={() => setIsExpanded((prev) => !prev)}
                expanded={isExpanded}
            >
                <ListItem title="Type" value={items.type} />
                <ListItem title="Base Model" value={items.baseModel} />
                <ListItem title="Downloads" value={items.downloads?.toLocaleString()} />
                <ListItem title="Uploaded" value={new Date(items.uploaded).toDateString()} />
                <ListItem title="Trigger Words" value={items.triggerWords?.join(', ')} />
                <ListItem title="AIR" value={items.air} />
            </List.Accordion>
        </View>
    );
};
