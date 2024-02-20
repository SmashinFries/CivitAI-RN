export const CIVITAI_URL = 'https://civitai.com/api/v1';

export enum Period {
    AllTime = 'AllTime',
    Year = 'Year',
    Month = 'Month',
    Week = 'Week',
    Day = 'Day',
}

// Creator Params and Response
export type MetaData = {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    nextPage: string;
    prevPage: string;
};
export type CreatorsParams = {
    limit?: number;
    page?: number;
    query?: string;
};
export type Creator = {
    username: string;
    modelCount: number;
    link: string;
};
export type Creators = {
    items: Creator[];
    metadata: MetaData;
};

export enum CivitAiNSFW {
    None = 'None',
    Soft = 'Soft',
    Mature = 'Mature',
    X = 'X',
}

export enum CivitAiImageSort {
    MostReactions = 'Most Reactions',
    MostComments = 'Most Comments',
    Newest = 'Newest',
}

// Image Params and Response
export type CivitAIImagesParams = {
    limit?: number;
    postId?: number;
    modelId?: number;
    modelVersionId?: number;
    username?: string;
    nsfw?: boolean | CivitAiNSFW;
    sort?: CivitAiImageSort;
    period?: Period;
    page?: number;
    imageId?: number | string;
};

export type CivitAIImageStats = {
    cryCount: number;
    laughCount: number;
    likeCount: number;
    dislikeCount: number;
    heartCount: number;
    commentCount: number;
};

export type CivitAIImageResource = {
    type: string;
    name: string;
    weight?: number;
    hash?: string;
};

export type CivitAIImage = {
    id: number;
    url: string;
    hash: string;
    width: number;
    height: number;
    nsfw: boolean;
    nsfwLevel: CivitAiNSFW;
    createdAt: string;
    postId: number;
    stats: CivitAIImageStats;
    meta: {
        Size: string;
        seed: number;
        Model: string;
        steps: number;
        prompt: string;
        sampler: string;
        cfgScale: number;
        Version: string;
        'Clip skip': string;
        'Hires upscale': string;
        'Hires upscaler': string;
        negativePrompt: string;
        'Denoising strength': string;
        resources: CivitAIImageResource[];
    };
    username: string;
};

export type CivitAIImages = {
    items: CivitAIImage[];
    metadata: MetaData;
};

export enum ModelTypes {
    // "Checkpoint",
    // "TextualInversion",
    // "Hypernetwork",
    // "AestheticGradient",
    // "LORA",
    // "LoCon",
    // "Controlnet",
    // "Upscaler",
    // "MotionModule",
    // "VAE",
    // "Poses",
    // "Wildcards",
    // "Workflows",
    // "Other"
    Checkpoint = 'Checkpoint',
    TextualInversion = 'TextualInversion',
    Hypernetwork = 'Hypernetwork',
    AestheticGradient = 'AestheticGradient',
    LORA = 'LORA',
    LoCon = 'LoCon',
    Controlnet = 'Controlnet',
    Poses = 'Poses',
    Upscaler = 'Upscaler',
    MotionModule = 'MotionModule',
    VAE = 'VAE',
    Wildcards = 'Wildcards',
    Workflows = 'Workflows',
    Other = 'Other',
}

export enum BaseModels {
    SD1_4 = 'SD 1.4',
    SD1_5 = 'SD 1.5',
    SD1_5_LCM = 'SD 1.5 LCM',
    SD2_0 = 'SD 2.0',
    SD2_0_768 = 'SD 2.0 768',
    SD2_1 = 'SD 2.1',
    SD2_1_768 = 'SD 2.1 768',
    SD2_1_Unclip = 'SD 2.1 Unclip',
    SDXL_0_9 = 'SDXL 0.9',
    SDXL_1_0 = 'SDXL 1.0',
    Pony = 'Pony',
    SDXL_1_0_LCM = 'SDXL 1.0 LCM',
    SDXL_Distilled = 'SDXL Distilled',
    SDXL_Turbo = 'SDXL Turbo',
    Stable_Cascade = 'Stable Cascade',
    SVD = 'SVD',
    SVD_XT = 'SVD XT',
    Playground_v2 = 'Playground v2',
    PixArt_A = 'PixArt a',
    Other = 'Other',
}

export enum ModelSort {
    HighestRated = 'Highest Rated',
    MostDownloaded = 'Most Downloaded',
    Newest = 'Newest',
}

export type CivitAIModelsParams = {
    limit?: number;
    page?: number;
    query?: string;
    tag?: string;
    username?: string;
    types?: ModelTypes;
    sort?: ModelSort;
    period?: Period;
    rating?: number;
    favorites?: boolean;
    hidden?: boolean;
    primaryFileOnly?: boolean;
    allowNoCredit?: boolean;
    allowDerivatives?: boolean;
    allowDifferentLicenses?: boolean;
    allowCommercialUse?: boolean;
    nsfw?: boolean;
    baseModels?: BaseModels;
};

export type ModelStats = {
    downloadCount: number;
    favoriteCount: number;
    commentCount: number;
    ratingCount: number;
    rating: number;
};

export type ModelHashes = {
    AutoV2: string;
    SHA256: string;
    CRC32: string;
    BLAKE3: string;
};

export type ModelVersionFile = {
    name: string;
    id: number;
    sizeKB: number;
    type: string;
    metadata: {
        fp: string;
        size: string;
        format: string;
    };
    pickleScanResult: string;
    pickleScanMessage: string;
    virusScanResult: string;
    scannedAt: string;
    hashes: ModelHashes;
    downloadUrl: string;
    primary: boolean;
};

export type ModelImageMeta = {
    ENSD: string;
    Size: string;
    seed: number;
    Score: string;
    steps: number;
    prompt: string;
    sampler: string;
    'Eta DDIM': string;
    cfgScale: number;
    resources: [];
    'Model hash': string;
    'Hires upscale': string;
    'Hires upscaler': string;
    negativePrompt: string;
    'Denoising strength': string;
};

export type ModelImagesItem = {
    url: string;
    nsfw: CivitAiNSFW;
    width: number;
    height: number;
    hash: string;
    meta: ModelImageMeta;
};

export type CivitAIModelVersionsItem = {
    id: number;
    modelId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    trainedWords: string[];
    baseModel: string;
    earlyAccessTimeFrame: number;
    description: string;
    model: {
        name: string;
        type: string;
        nsfw: boolean;
        poi: boolean;
    };
    stats: {
        downloadCount: number;
        ratingCount: number;
        rating: number;
    };
    files: ModelVersionFile[];
    images: ModelImagesItem[];
    downloadUrl: string;
};

export type CivitAIModelItem = {
    id: number;
    name: string;
    description: string;
    type: ModelTypes;
    poi: boolean;
    nsfw: boolean;
    allowNoCredit: boolean;
    allowCommercialUse: boolean;
    allowDerivatives: boolean;
    allowDifferentLicense: boolean;
    stats: ModelStats;
    creator: {
        username: string;
        image: string;
    };
    tags: string[];
    modelVersions: CivitAIModelVersionsItem[];
};

export type CivitAIModelSearch = {
    items: CivitAIModelItem[];
    metadata: MetaData;
};

export type CivitAITagsParams = {
    limit?: number;
    query?: string;
    page?: number;
};

export type CivitAITagItem = {
    name: string;
    modelCount: number;
    link: string;
};

export type CivitAITags = {
    items: CivitAITagItem[];
    metadata: MetaData;
};
