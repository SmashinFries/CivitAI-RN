import { useCallback, useMemo } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { CivitAIImage, Period } from '../../api/civitai';
import Animated from 'react-native-reanimated';
import { ImageCard } from '../../features/images/components/card';
import { MasonryFlashList } from '@shopify/flash-list';
import { useImagesQuery } from '../../api/api';
import { Link, useRouter } from 'expo-router';

const ImagesPage = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const {data, fetchNextPage, isFetching, refetch, isRefetching} = useImagesQuery({limit:30, nsfw:"None", sort:"Most Reactions", period: Period.Day});

  const allItems = useMemo(
    () => data?.pages.flatMap(page => page.items),
    [data]
  )

  const keyExtractor = useCallback((item:CivitAIImage, index:number) => index.toString(),[]);

    const RenderItem = useCallback((props:{item:CivitAIImage, index:number}) => {
        return(
          <Link href={`/images/${props.item.id}`} asChild>
              <Pressable style={{margin:5}}>
                  <Animated.View style={{width:width/2, maxHeight:height/2}} sharedTransitionTag="ImageDetail">
                      <ImageCard {...props} maxHeight={height/2} width={width/2}  />
                  </Animated.View>
              </Pressable>
            </Link>
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
                refreshing={isRefetching}
                onRefresh={refetch}
                onEndReached={fetchNextPage}
                onEndReachedThreshold={0.7}
            />}
        </View>
  );
}

export default ImagesPage;