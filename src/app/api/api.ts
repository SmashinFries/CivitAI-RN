import axios from 'axios'
import { useState } from 'react';
import { CIVITAI_URL, CivitAIImages, CivitAIImagesParams, CivitAIModelItem, CivitAIModelSearch, CivitAIModelsParams, CivitAITags, Creators, CreatorsParams } from './civitai';

const CivitAiClient = axios.create({
    baseURL: CIVITAI_URL
});

const models_url = "/models";
const model_versions_url = "/models-versions";
const model_versions_hash_url = model_versions_url+'/by-hash'
const tags_url = "/tags";
const images_url = "/images";

export const useModelsQuery = () => {
    const [results, setResults] = useState<CivitAIModelSearch>();
    const [loading, setLoading] = useState(false);

    const fetchModels = async (params:CivitAIModelsParams) => {
        setLoading(true);
        try {
            const response = await CivitAiClient.get<CivitAIModelSearch>(models_url, { params });
            setResults(response.data);
        } catch (error) {
            console.log(error);
        }
        
        setLoading(false);
    };

    return { results, loading, fetchModels };
};

export const useModelsIdQuery = () => {
    const [results, setResults] = useState<CivitAIModelItem>();
    const [loading, setLoading] = useState(false);

    const fetchModelId = async (id:number) => {
        setLoading(true);
        const response = await CivitAiClient.get<CivitAIModelItem>(model_versions_url+`/${id}`);
        setResults(response.data);
        setLoading(false);
    };

    return { results, loading, fetchModelId };
};

export const useImagesQuery = () => {
    const [results, setResults] = useState<CivitAIImages>();
    const [loading, setLoading] = useState(false);

    const fetchImages = async (params:CivitAIImagesParams) => {
        setLoading(true);
        const response = await CivitAiClient.get<CivitAIImages>(images_url, {params: params});
        setResults(response.data);
        setLoading(false);
    };

    return { results, loading, fetchImages };
};

export const useCreatorsQuery = () => {
    const [results, setResults] = useState<Creators>();
    const [loading, setLoading] = useState(false);

    const fetchCreators = async (params:CreatorsParams) => {
        setLoading(true);
        const response = await CivitAiClient.get<Creators>(images_url, {params: params});
        setResults(response.data);
        setLoading(false);
    };

    return { results, loading, fetchCreators };
};

export const useTagsQuery = () => {
    const [results, setResults] = useState<CivitAITags>();
    const [loading, setLoading] = useState(false);

    const fetchCreators = async (params:CivitAIImagesParams) => {
        setLoading(true);
        const response = await CivitAiClient.get<CivitAITags>(images_url, {params: params});
        setResults(response.data);
        setLoading(false);
    };

    return { results, loading, fetchCreators };
};