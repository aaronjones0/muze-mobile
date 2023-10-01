import {
  Alert,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import { useEffect, useState } from 'react';
import { TVSeries } from '../../model/TVSeries';
import { useAuth } from '../../../lib/providers/AuthProvider';
import { supabase } from '../../../lib/supabase';
import AddFAB from '../../components/AddFAB/AddFAB';
import TVSeriesCard from '../../components/TVSeriesCard/TVSeriesCard';

export default function TVSeriesCollection({ navigation }) {
  const storageBucket = 'tv_series';

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tvSeries, setTvSeries] = useState<TVSeries[] | null>(null);

  useEffect(() => {
    if (!user) return;

    loadTVSeries(user.id);
  }, [user]);

  const loadTVSeries = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('tv_series').select('*');

      if (!!error) {
        throw error;
      }

      setTvSeries(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadKeyImage = async (tvSeriesId: string): Promise<string | null> => {
    const { data } = await supabase.storage
      .from(storageBucket)
      .list(`${user.id}/${tvSeriesId}`);

    if (!!data) {
      const keyImage = data[0];
      await supabase.storage
        .from(storageBucket)
        .download(`${user.id}/${tvSeriesId}/${keyImage.name}`)
        .then(({ data }) => {
          const fr = new FileReader();
          fr.readAsDataURL(data!);
          fr.onload = () => {
            return fr.result as string;
          };
        });
    } else {
      return null;
    }
  };

  return (
    <Box height='100%' backgroundColor='backgroundSurface'>
      <Box position='absolute' bottom={56} alignSelf='center' zIndex={10}>
        <AddFAB onPress={() => navigation.navigate('Add TV Series')} />
      </Box>
      {!!tvSeries ? (
        <ScrollView
          style={{ paddingTop: 24, paddingHorizontal: 24, paddingBottom: 96 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadTVSeries(user.id)}
            />
          }
        >
          {tvSeries.map((item, index) => (
            // <Pressable
            //   key={item.id}
            //   onPress={() =>
            //     navigation.navigate('TV Series Detail', { tvSeriesId: item.id })
            //   }
            // >
            //   <Box
            //     backgroundColor='backgroundSurface'
            //     borderColor='backgroundSurfaceBorder'
            //     borderTopWidth={1}
            //     borderLeftWidth={1}
            //     borderRightWidth={1}
            //     borderRadius={24}
            //     padding='s8'
            //     shadowColor='shadowColor'
            //     shadowOffset={{ width: 0, height: 8 }}
            //     shadowOpacity={0.8}
            //     shadowRadius={16}
            //     marginBottom='s8'
            //   >
            //     <Text variant='h2'>{item.full_title}</Text>
            //     <Text variant='label'>{item.content_rating}</Text>
            //     <Box flexDirection='row' justifyContent='space-between'>
            //       <Box flexDirection='row'>
            //         <Text variant='label'>Seasons: </Text>
            //         <Text variant='body'>{item.season_count}</Text>
            //       </Box>
            //       <Box flexDirection='row'>
            //         <Text variant='label'>Episodes: </Text>
            //         <Text variant='body'>{item.episode_count}</Text>
            //       </Box>
            //     </Box>
            //   </Box>
            // </Pressable>
            <TVSeriesCard
              key={item.id}
              onPress={() =>
                navigation.navigate('TV Series Detail', { tvSeriesId: item.id })
              }
              tvSeries={item}
              userId={user.id}
            />
          ))}
        </ScrollView>
      ) : (
        <Text variant='body'>Loading...</Text>
      )}
    </Box>
  );
}
