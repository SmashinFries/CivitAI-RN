import axios from 'axios'
import { useState } from 'react';
import { useQuery, useInfiniteQuery } from 'react-query';
import { CIVITAI_URL, CivitAIImages, CivitAIImagesParams, CivitAIModelItem, CivitAIModelSearch, CivitAIModelsParams, CivitAITags, CivitAITagsParams, Creators, CreatorsParams } from './civitai';

const CivitAiClient = axios.create({
    baseURL: CIVITAI_URL
});

const models_url = "/models";
const model_versions_url = "/models-versions";
const model_versions_hash_url = model_versions_url+'/by-hash'
const tags_url = "/tags";
const images_url = "/images";



const fetchModels = async (params:CivitAIModelsParams) => {
    const { data } = await CivitAiClient.get<CivitAIModelSearch>(models_url, { params });
    return data;
};

const fetchModel = async (id:number|string|undefined) => {
    const { data } = await CivitAiClient.get<CivitAIModelItem>(models_url+`/${id}`);
    return data;
};

// const fetchModelId = async (id:number) => {
//     const { data } = await CivitAiClient.get<CivitAIModelItem>(model_versions_url+`/${id}`);
//     return data;
// };

const fetchImages = async (params:CivitAIImagesParams) => {
    const { data } = await CivitAiClient.get<CivitAIImages>(images_url, {params: params});
    return data;
};

const fetchTags = async (params:CivitAITagsParams) => {
    const { data } = await CivitAiClient.get<CivitAITags>(tags_url, {params: params});
    return data;
};

export const useModelsQuery = (params:CivitAIModelsParams) => useQuery(['models', params.sort], () => fetchModels(params));

// export const useModelIdQuery = (id:number) => useQuery(['modelId', id], () => fetchModelId(id));
export const useModelQuery = (id:number|string|undefined) => useQuery(['model', id], () => fetchModel(id));

export const useImagesQuery = (params:CivitAIImagesParams, enabled:boolean=true) => useInfiniteQuery(['images', params], ({pageParam=1}) => fetchImages({...params, page:pageParam}), { enabled:enabled, getNextPageParam: (lastPage) => lastPage.metadata.currentPage + 1 });

export const useImageIdQuery = (params:CivitAIImagesParams) => useQuery(['image', params.imageId], () => fetchImages(params));

export const useTagsQuery = (params:CivitAITagsParams) => useQuery('images', () => fetchTags(params));
// export const useCreatorsQuery = () => {
//     const [results, setResults] = useState<Creators>();
//     const [loading, setLoading] = useState(false);

//     const fetchCreators = async (params:CreatorsParams) => {
//         setLoading(true);
//         const response = await CivitAiClient.get<Creators>(images_url, {params: params});
//         setResults(response.data);
//         setLoading(false);
//     };

//     return { results, loading, fetchCreators };
// };

// export const useTagsQuery = () => {
//     const [results, setResults] = useState<CivitAITags>();
//     const [loading, setLoading] = useState(false);

//     const fetchCreators = async (params:CivitAIImagesParams) => {
//         setLoading(true);
//         const response = await CivitAiClient.get<CivitAITags>(images_url, {params: params});
//         setResults(response.data);
//         setLoading(false);
//     };

//     return { results, loading, fetchCreators };
// };