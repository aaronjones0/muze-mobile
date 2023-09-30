import { Alert, ScrollView } from 'react-native';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import { useEffect, useState } from 'react';
import { TVSeries } from '../../model/TVSeries';
import { useAuth } from '../../../lib/providers/AuthProvider';
import { supabase } from '../../../lib/supabase';
import AddFAB from '../../components/AddFAB/AddFAB';

export default function TVSeriesCollection({ navigation }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tvSeries, setTvSeries] = useState<TVSeries[] | null>(null);

  useEffect(() => {
    if (!user) return;

    loadTVSeries(user.id);
  }, [user]);

  const loadTVSeries = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('tv_series').select('*');

      console.debug(data);

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

  return (
    <Box height='100%' backgroundColor='backgroundSurface'>
      <Box position='absolute' bottom={56} alignSelf='center' zIndex={10}>
        <AddFAB onPress={() => navigation.navigate('Add TV Series')} />
      </Box>
      {!!tvSeries ? (
        <ScrollView style={{ padding: 24 }}>
          {tvSeries.map((item, index) => (
            <Box
              key={item.id}
              backgroundColor='backgroundSurface'
              borderColor='backgroundSurfaceBorder'
              borderTopWidth={1}
              borderLeftWidth={1}
              borderRightWidth={1}
              borderRadius={24}
              padding='s8'
              shadowColor='shadowColor'
              shadowOffset={{ width: 0, height: 8 }}
              shadowOpacity={0.8}
              shadowRadius={16}
              marginBottom='s8'
            >
              <Text variant='h2'>{item.full_title}</Text>
              <Text variant='label'>{item.content_rating}</Text>
              <Box flexDirection='row' justifyContent='space-between'>
                <Box flexDirection='row'>
                  <Text variant='label'>Seasons: </Text>
                  <Text variant='body'>{item.season_count}</Text>
                </Box>
                <Box flexDirection='row'>
                  <Text variant='label'>Episodes: </Text>
                  <Text variant='body'>{item.episode_count}</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </ScrollView>
      ) : (
        <Text variant='body'>Loading...</Text>
      )}
    </Box>
  );
}
