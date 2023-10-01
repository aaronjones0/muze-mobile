import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../../lib/providers/AuthProvider';
import { supabase } from '../../../lib/supabase';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import { TVSeries } from '../../model/TVSeries';
import RaisedButton from '../../components/RaisedButton/RaisedButton';

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
  const [editing, setEditing] = useState(false);

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
    <Box
      height='100%'
      backgroundColor='backgroundSurface'
      paddingHorizontal='s12'
      paddingTop='s12'
      paddingBottom='s20'
    >
      {!!tvSeries ? (
        <Box height='100%' flexDirection='column' gap='s4'>
          <Text variant='h1'>{tvSeries.full_title}</Text>
          {tvSeries.short_title && (
            <Text variant='label'>"{tvSeries.short_title}"</Text>
          )}
          <Text variant='label'>{tvSeries.content_rating}</Text>
          <Text variant='body'>{tvSeries.synopsis}</Text>
          <Box flexDirection='row'>
            <Text variant='label'>Seasons: </Text>
            <Text variant='body'>{tvSeries.season_count}</Text>
          </Box>
          <Box flexDirection='row'>
            <Text variant='label'>Episodes: </Text>
            <Text variant='body'>{tvSeries.episode_count}</Text>
          </Box>
          <Box flexGrow={1}></Box>
          <Box flexGrow={0}>
            {!editing ? (
              <RaisedButton label='Edit' onPress={() => setEditing(true)} />
            ) : (
              <Box flexDirection='row' gap='s8'>
                <RaisedButton label='Save' onPress={() => setEditing(false)} />
                <RaisedButton
                  label='Cancel'
                  onPress={() => setEditing(false)}
                />
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
}
