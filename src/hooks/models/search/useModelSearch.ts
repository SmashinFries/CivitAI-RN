import { useState } from 'react';
import { useModelsQuery } from '../../../api/api';
import { BaseModels, ModelSort, ModelTypes, Period } from '../../../api/civitai';
import { useSettingsStore } from '../../../store';

const useModelSearch = () => {
    const { showNSFW } = useSettingsStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [usernameQuery, setUsernameQuery] = useState('');
    const [tagQuery, setTagQuery] = useState('');
    const [sort, setSort] = useState<ModelSort>(ModelSort.MostDownloaded);
    const [modelType, setModelType] = useState<ModelTypes>(ModelTypes.Checkpoint);
    const [period, setPeriod] = useState<Period>(Period.AllTime);
    const [nsfw, setNsfw] = useState(showNSFW);
    const [baseModels, setBaseModels] = useState<BaseModels|undefined>();

    const { data, refetch, fetchNextPage, isFetching, isRefetching } = useModelsQuery(
        { limit: 24, baseModels:baseModels, sort: sort, types: modelType, period: period, nsfw: nsfw },
        searchQuery,
        usernameQuery,
        tagQuery,
        
    );

    const onSearchPress = () => {
        refetch();
    };

    const updateSearch = (search: string) => {
        setSearchQuery(search);
    };

    const updateUserName = (username: string) => {
        setUsernameQuery(username);
    };

    const updateTag = (tag: string) => {
        setTagQuery(tag);
    };

    const updateSort = (sort: ModelSort) => {
        setSort(sort);
    };

    const updateModelType = (type: ModelTypes) => {
        setModelType(type);
    };

    const updatePeriod = (period: Period) => {
        setPeriod(period);
    };

    const updateNsfw = (nsfw: boolean) => {
        setNsfw(nsfw);
    };

    const updateBaseModels = (model: BaseModels|undefined) => {
        setBaseModels(model);
    };

    return {
        data,
        isFetching,
        isRefetching,
        refetch,
        fetchNextPage,
        searchQuery,
        usernameQuery,
        tagQuery,
        sort,
        modelType,
        period,
        nsfw,
        baseModels,
        updateSearch,
        updateUserName,
        updateTag,
        updateSort,
        updateModelType,
        updatePeriod,
        updateNsfw,
        onSearchPress,
        updateBaseModels
    };
};

export type ModelSearch = ReturnType<typeof useModelSearch>;

export default useModelSearch;
