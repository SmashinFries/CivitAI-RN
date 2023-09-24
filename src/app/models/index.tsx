import { useWindowDimensions, ScrollView, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import { useModelsQuery } from '../../api/api';
import { ModelSort } from '../../api/civitai';
import { ModelSection } from '../../components/models/sections';
import { useState } from 'react';

const ModelsPage = () => {
  const { width, height } = useWindowDimensions();
  const newestModels = useModelsQuery({ page: 1, sort: ModelSort.Newest});
  const mostDownloadedModels = useModelsQuery({ page: 1, sort: ModelSort.MostDownloaded});
  const highestRatedModels = useModelsQuery({ page: 1, sort: ModelSort.HighestRated});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async() => {
    setIsRefreshing(true);
    await newestModels.refetch();
    await mostDownloadedModels.refetch();
    await highestRatedModels.refetch();
    setIsRefreshing(false);
  };

  return(
    <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />} style={{flex:1, width:width}}>
            <ModelSection title={"Newest"} data={newestModels.data} isLoading={newestModels.isFetching} />
            <ModelSection title={"Most Downloaded"} data={mostDownloadedModels.data} isLoading={mostDownloadedModels.isFetching} />
            <ModelSection title={"Top Rated"} data={highestRatedModels.data} isLoading={highestRatedModels.isFetching} />
        </ScrollView>
  );
}

export default ModelsPage;