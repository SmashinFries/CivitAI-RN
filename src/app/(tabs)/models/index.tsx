import { useWindowDimensions, ScrollView, RefreshControl } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useModelsQuery } from '../../../api/api';
import { ModelSort } from '../../../api/civitai';
import { ModelSection } from '../../../components/models/sections';
import { useState } from 'react';
import { useSettingsStore } from '../../../store';
import { ThemedRefreshControl } from '../../../components/refreshControl';
import { LoadingIcon } from '../../../components/loading';

const ModelsPage = () => {
    const { width, height } = useWindowDimensions();
    const { colors } = useTheme();
    const { showNSFW } = useSettingsStore();
    const newestModels = useModelsQuery({ page: 1, nsfw: showNSFW, sort: ModelSort.Newest });
    const mostDownloadedModels = useModelsQuery({
        page: 1,
        nsfw: showNSFW,
        sort: ModelSort.MostDownloaded,
    });
    const highestRatedModels = useModelsQuery({
        page: 1,
        nsfw: showNSFW,
        sort: ModelSort.HighestRated,
    });
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = async () => {
        setIsRefreshing(true);
        await newestModels.refetch();
        await mostDownloadedModels.refetch();
        await highestRatedModels.refetch();
        setIsRefreshing(false);
    };

    if (newestModels.isLoading || mostDownloadedModels.isLoading || highestRatedModels.isLoading) {
        return <LoadingIcon />;
    }

    return (
        <ScrollView
            refreshControl={
                <ThemedRefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            style={{ flex: 1, width: width }}
        >
            <ModelSection
                title={'Newest'}
                data={newestModels.data?.pages[0]}
                isLoading={newestModels.isFetching}
            />
            <ModelSection
                title={'Most Downloaded'}
                data={mostDownloadedModels.data?.pages[0]}
                isLoading={mostDownloadedModels.isFetching}
            />
            <ModelSection
                title={'Top Rated'}
                data={highestRatedModels.data?.pages[0]}
                isLoading={highestRatedModels.isFetching}
            />
        </ScrollView>
    );
};

export default ModelsPage;
