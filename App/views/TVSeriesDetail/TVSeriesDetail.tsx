import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../../lib/providers/AuthProvider';
import { supabase } from '../../../lib/supabase';
import Box from '../../components/Box/Box';
import Text from '../../components/Text/Text';
import { TVSeries } from '../../model/TVSeries';
import RaisedButton from '../../components/RaisedButton/RaisedButton';
import * as ImagePicker from 'expo-image-picker';
import { readAsStringAsync } from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { FileObject } from '@supabase/storage-js';
import { useTheme } from '@shopify/restyle';
import ImageBox from '../../components/ImageBox/ImageBox';

export default function TVSeriesDetail({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const tableName = 'tv_series';
  const bucket = 'tv_series';

  const { user } = useAuth();

  const theme = useTheme();
  const colors = theme.colors;

  const { tvSeriesId } = route.params;

  const [tvSeries, setTvSeries] = useState<TVSeries | null>(null);
  const [images, setImages] = useState<FileObject[] | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user) navigation.navigate('Home');

    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const { data, error } = await supabase
        .from(tableName)
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

    // Download images:
    const { data } = await supabase.storage
      .from(bucket)
      .list(`${user.id}/${tvSeriesId}`);

    if (data) {
      setImages(data);
    }
  };

  const onUploadImage = async () => {
    // Get permission:
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      return;
    }

    // Limit to images:
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    };

    // Open image picker:
    const result = await ImagePicker.launchImageLibraryAsync(options);

    // Save image if not cancelled:
    if (!result.canceled) {
      const img = result.assets[0];
      const base64 = await readAsStringAsync(img.uri, {
        encoding: 'base64',
      });

      // Generate file name:
      const fileName = `${new Date().getTime()}.${
        img.type === 'image' ? 'png' : 'mp4'
      }`;

      // Build file path and get content type:
      const filePath = `${user.id}/${tvSeriesId}/${fileName}`;
      const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';

      // Upload the new avatar to storage:
      try {
        await supabase.storage
          .from(bucket)
          .upload(filePath, decode(base64), { contentType });
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('An error occurred during file upload: ' + error.message);
        } else {
          console.error('Unable to upload image.');
          throw error;
        }
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
          {!!images && (
            <Box flexDirection='row' flexWrap='wrap'>
              {images.map((image, index) => (
                <ImageBox
                  item={image}
                  bucket={bucket}
                  path={`${user.id}/${tvSeriesId}`}
                  key={image.id}
                  onRemoveImage={() => {}}
                />
              ))}
            </Box>
          )}
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
          {editing ? (
            <Box>
              <RaisedButton
                label='Upload image'
                onPress={() => onUploadImage()}
              />
            </Box>
          ) : null}
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
