import { useCallback, useMemo } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { CivitAIImage, CivitAiNSFW, Period } from '../../../api/civitai';
import Animated from 'react-native-reanimated';
import { ImageCard } from '../../../components/images/card';
import { MasonryFlashList } from '@shopify/flash-list';
import { useImagesQuery } from '../../../api/api';
import { Link, useRouter } from 'expo-router';
import { useSettingsStore } from '../../../store';
import { ThemedRefreshControl } from '../../../components/refreshControl';

const ImagesPage = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const {showNSFW} = useSettingsStore();

  const {data, fetchNextPage, isFetching, refetch, isRefetching} = useImagesQuery({limit:30, sort:"Most Reactions", nsfw:showNSFW ? true : CivitAiNSFW.None, period: Period.Day});

  const allItems = useMemo(
    () => data?.pages.flatMap(page => page.items),
    [data]
  )

  const keyExtractor = useCallback((item:CivitAIImage, index:number) => index.toString(),[]);

    const RenderItem = useCallback((props:{item:CivitAIImage, index:number}) => {
        return(
                  <Animated.View style={{width:width/2, margin:5, maxHeight:height/2}} sharedTransitionTag="ImageDetail">
                      <ImageCard {...props} maxHeight={height/2} width={width/2} />
                  </Animated.View>
        );
    },[width, height])

  return(
    <View style={{ width: '100%', flex: 1 }}>
            {data && <MasonryFlashList 
                data={allItems}
                keyExtractor={keyExtractor}
                renderItem={RenderItem}
                numColumns={2}
                estimatedItemSize={271}
                refreshControl={<ThemedRefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                onEndReached={fetchNextPage}
                onEndReachedThreshold={0.7}
            />}
        </View>
  );
}

export default ImagesPage;