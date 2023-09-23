import { NavigatorScreenParams } from "@react-navigation/native";

export type RootBtmTabParamList = {
    ModelsStack: NavigatorScreenParams<ModelStackParamList>;
    ImagesStack: NavigatorScreenParams<ImageStackParamList>;
    CreatorsStack: undefined;
    MoreStack: undefined;
};

export type ImageStackParamList = {
    Images: undefined;
    ImageDetails: { id:number, img_url: string, width: number, height: number };
};

export type ModelStackParamList = {
    Models: undefined;
    ModelDetails: { id:number }
};