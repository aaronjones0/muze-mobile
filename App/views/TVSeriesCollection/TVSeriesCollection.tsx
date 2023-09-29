import { Alert, ScrollView } from 'react-native';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import { useEffect, useState } from 'react';
import { TVSeries } from '../../model/TVSeries';
import { useAuth } from '../../../lib/providers/AuthProvider';
import { supabase } from '../../../lib/supabase';
import AddFAB from '../../components/AddFAB/AddFAB';

export default function TVSeriesCollection() {
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
      <Box position='absolute' bottom={56} alignSelf='center'>
        <AddFAB onPress={() => {}} />
      </Box>
      {!!tvSeries ? (
        <ScrollView>
          {tvSeries.map((item, index) => (
            <Text>{item.full_title}</Text>
          ))}
        </ScrollView>
      ) : (
        <Text variant='body'>Loading...</Text>
      )}
    </Box>
  );
}
