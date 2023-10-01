import { Image, Pressable } from 'react-native';
import Box from '../Box/Box';
import Text from '../Text/Text';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { TVSeries } from '../../model/TVSeries';
import { useTheme } from '@shopify/restyle';

export interface TVSeriesCardProps {
  userId: string;
  tvSeries: TVSeries;
  onPress: () => void;
}

export default function TVSeriesCard({
  userId,
  tvSeries,
  onPress,
}: TVSeriesCardProps) {
  const storageBucket = 'tv_series';

  const theme = useTheme();
  const colors = theme.colors;

  const [keyImageUrl, setKeyImageUrl] = useState<string | null>(null);

  useEffect(() => {
    loadKeyImage(tvSeries.id);
  }, [tvSeries.id]);

  const loadKeyImage = async (tvSeriesId: string) => {
    const { data } = await supabase.storage
      .from(storageBucket)
      .list(`${userId}/${tvSeriesId}`);

    if (!!data) {
      const keyImage = data[0];
      await supabase.storage
        .from(storageBucket)
        .download(`${userId}/${tvSeriesId}/${keyImage.name}`)
        .then(({ data }) => {
          const fr = new FileReader();
          fr.readAsDataURL(data!);
          fr.onload = () => {
            setKeyImageUrl(fr.result as string);
          };
        });
    } else {
      setKeyImageUrl(null);
    }
  };

  return (
    <Pressable onPress={() => onPress()}>
      <Box
        backgroundColor='backgroundSurface'
        borderColor='backgroundSurfaceBorder'
        borderTopWidth={1}
        borderLeftWidth={1}
        borderRightWidth={1}
        borderRadius={24}
        // padding='s8'
        shadowColor='shadowColor'
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={0.8}
        shadowRadius={16}
        marginBottom='s8'
      >
        {!!keyImageUrl && (
          <Box
            height={150}
            width='100%'
            position='relative'
            overflow='hidden'
            borderTopStartRadius={24}
            borderTopEndRadius={24}
          >
            <Image
              style={{
                position: 'absolute',
                width: '100%',
                height: 150,
                resizeMode: 'cover',
              }}
              blurRadius={12}
              source={{ uri: keyImageUrl }}
            />
            <Image
              style={{
                position: 'absolute',
                width: '100%',
                height: 150,
                resizeMode: 'contain',
              }}
              source={{ uri: keyImageUrl }}
            />
          </Box>
        )}
        <Box paddingTop='s4' paddingHorizontal='s8' paddingBottom='s8'>
          <Text variant='h2'>{tvSeries.full_title}</Text>
          {/* <Text variant='label'>{tvSeries.content_rating}</Text>
          <Box flexDirection='row' justifyContent='space-between'>
            <Box flexDirection='row'>
              <Text variant='label'>Seasons: </Text>
              <Text variant='body'>{tvSeries.season_count}</Text>
            </Box>
            <Box flexDirection='row'>
              <Text variant='label'>Episodes: </Text>
              <Text variant='body'>{tvSeries.episode_count}</Text>
            </Box>
          </Box> */}
        </Box>
      </Box>
    </Pressable>
  );
}
