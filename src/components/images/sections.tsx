// import { useCallback } from "react";
// import { CivitAIImages } from "../../../app/api/civitai";

// type ImageSectionProps = {
//     data: CivitAIImages | undefined;
//     isLoading: boolean;
//     title: string;
// };
// export const ImageSection = ({data, isLoading, title}:ImageSectionProps) => {
//     const { width, height } = useWindowDimensions();

//     const keyExtractor = useCallback((item:CivitAIModelItem, index:number) => index.toString(),[]);

//     return(
//         <View style={{ flex:1}}>
//             <ListHeading title={title} titleVariant="headlineMedium" />
//             <View style={{height:230, justifyContent:'center'}}>
//             {(!isLoading) ? <FlashList 
//                 data={data?.items}
//                 keyExtractor={keyExtractor}
//                 renderItem={ModelCard}
//                 estimatedItemSize={100}
//                 horizontal
//             /> : <ActivityIndicator size="large" />}
//             </View>
//         </View>
//     );
// }