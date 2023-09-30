import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../../lib/providers/AuthProvider';
import { supabase } from '../../../lib/supabase';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import { TVSeries } from '../../model/TVSeries';

export default function TVSeriesDetail({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { user } = useAuth();

  const { tvSeriesId } = route.params;

  const [tvSeries, setTvSeries] = useState<TVSeries | null>(null);

  useEffect(() => {
    if (!user) navigation.navigate('Home');

    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const { data, error } = await supabase
        .from('tv_series')
        .select('*')
        .eq('id', tvSeriesId);

      if (!!error) {
        throw error;
      }

      setTvSeries(data[0]);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  };

  return (
    <Box height='100%' backgroundColor='backgroundSurface' padding='s12'>
      {!!tvSeries ? (
        <Box flexDirection='column' gap='s4'>
          <Text variant='h1'>{tvSeries.full_title}</Text>
          {tvSeries.short_title && (
            <Text variant='label'>"{tvSeries.short_title}"</Text>
          )}
          <Text variant='label'>{tvSeries.content_rating}</Text>
          <Text variant='body'>{tvSeries.synopsis}</Text>
          <Text variant='label'>Seasons: {tvSeries.season_count}</Text>
          <Text variant='label'>Episodes: {tvSeries.episode_count}</Text>
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
}
