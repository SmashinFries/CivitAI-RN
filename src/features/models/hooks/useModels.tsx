import { useState } from "react";
import { useModelsQuery } from "../../../app/api/api";
import { ModelSort } from "../../../app/api/civitai";

export const useModels = () => {
    const newestModels = useModelsQuery();
    const mostDownloadedModels = useModelsQuery();
    const highestRatedModels = useModelsQuery();

	const [isRefreshing, setIsRefreshing] = useState(false);

	const onRefresh = () => {
		setIsRefreshing(true);
		newestModels.fetchModels({
			page: 1,
			limit: 24,
			sort: ModelSort.Newest,
			nsfw: false,
		});
		mostDownloadedModels.fetchModels({
			page: 1,
			limit: 24,
			sort: ModelSort.MostDownloaded,
			nsfw: false,
		});
		highestRatedModels.fetchModels({
			page: 1,
			limit: 24,
			sort: ModelSort.HighestRated,
			nsfw: false,
		});
		setIsRefreshing(false);
	}

  return {
    highestRatedModels,
    mostDownloadedModels,
    newestModels,
	isRefreshing,
	onRefresh
  };
};