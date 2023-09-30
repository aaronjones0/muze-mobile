import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import { useAuth } from '../../../lib/providers/AuthProvider';
import Box from '../../components/Box/Box';
import Input from '../../components/Input/Input';
import NumericInput from '../../components/NumericInput/NumericInput';
import Text from '../../components/Text/Text';
import { TVSeries } from '../../model/TVSeries';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@react-navigation/native';

export default function TVSeriesAdd({ navigation }) {
  const { user } = useAuth();
  const theme = useTheme();
  const colors = theme.colors;

  const [fullTitle, setFullTitle] = useState('');
  const [shortTitle, setShortTitle] = useState('');
  const [contentRating, setContentRating] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [seasonCount, setSeasonCount] = useState<number>(1);
  const [episodeCount, setEpisodeCount] = useState<number>(1);

  useEffect(() => {
    if (!user) navigation.navigate('Home');
  }),
    [user];

  const saveTVSeries = async () => {
    const ts: TVSeries = {
      user_id: user.id,
      full_title: fullTitle,
      short_title: shortTitle,
      content_rating: contentRating,
      synopsis: synopsis,
      season_count: seasonCount,
      episode_count: episodeCount,
      release_date_jpn: null,
      release_date_kor: null,
      release_date_uk: null,
      release_date_us: null,
    };

    try {
      const { data, error } = await supabase
        .from('tv_series')
        .insert([ts])
        .select();

      if (!!error) {
        throw error;
      }

      navigation.navigate(`TV Series'`);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, flexDirection: 'column' }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box
          backgroundColor='backgroundSurface'
          height='100%'
          padding='s10'
          flexDirection='column'
          gap='s10'
        >
          <Input
            editing
            label='Full Title'
            value={fullTitle}
            onValueChange={setFullTitle}
          />
          <Input
            editing
            label='Short Title'
            value={shortTitle}
            onValueChange={setShortTitle}
          />
          <Input
            editing
            label='Content Rating'
            value={contentRating}
            onValueChange={setContentRating}
          />
          <Box height={200}>
            <Input
              multiline
              editing
              label='Synopsis'
              value={synopsis}
              onValueChange={setSynopsis}
            />
          </Box>
          <Box flexDirection='row' gap='s10'>
            <Box flexGrow={1}>
              <NumericInput
                editing
                label='Season Count'
                value={seasonCount}
                onValueChange={setSeasonCount}
              />
            </Box>
            <Box flexGrow={1}>
              <NumericInput
                editing
                label='Episode Count'
                value={episodeCount}
                onValueChange={setEpisodeCount}
              />
            </Box>
          </Box>
          <Box flexDirection='row' gap='s10' width='100%'>
            <Pressable
              onPress={() => navigation.navigate(`TV Series'`)}
              style={{ flexGrow: 1 }}
            >
              <Box
                backgroundColor='primarySurface'
                borderColor='primarySurfaceBorder'
                borderLeftWidth={1}
                borderTopWidth={1}
                borderRightWidth={1}
                borderRadius={24}
                shadowColor='shadowColor'
                shadowOffset={{ width: 0, height: 6 }}
                shadowRadius={6}
                shadowOpacity={0.8}
                flexGrow={1}
              >
                <Button
                  title='Save'
                  onPress={() => saveTVSeries()}
                  color={colors.text1}
                />
              </Box>
            </Pressable>
            <Pressable onPress={() => saveTVSeries()} style={{ flexGrow: 1 }}>
              <Box
                backgroundColor='backgroundSurface'
                borderColor='backgroundSurfaceBorder'
                borderLeftWidth={1}
                borderTopWidth={1}
                borderRightWidth={1}
                borderRadius={24}
                shadowColor='shadowColor'
                shadowOffset={{ width: 0, height: 4 }}
                shadowRadius={8}
                shadowOpacity={0.8}
                paddingVertical='s4'
                paddingHorizontal='s6'
              >
                <Text variant='label' textAlign='center'>
                  Cancel
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
