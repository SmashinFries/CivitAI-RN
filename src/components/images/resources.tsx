import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { CivitAIModelVersionsItem } from '../../api/civitai';
import { ModelCard, ModelResourceCard } from '../models/card';
import { Image } from 'expo-image';
import { useSaveStore } from '../../store';

type ResourcesListProps = {
    resources: (CivitAIModelVersionsItem | undefined)[];
};
export const ResourcesList = ({ resources }: ResourcesListProps) => {
    const { models } = useSaveStore();
    if (!resources || resources?.length < 1) return null;

    return (
        <View>
            <ScrollView horizontal>
                {resources?.map((value, index) => (
                    <View key={index}>
                        <ModelResourceCard
                            key={index}
                            isSaved={
                                models.find((model) => model.id === value?.modelId) ? true : false
                            }
                            index={index}
                            item={value}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
