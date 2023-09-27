import { FileObject } from '@supabase/storage-js';
import { decode } from 'base64-arraybuffer';
import { readAsStringAsync } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Dispatch, SetStateAction } from 'react';
import { supabase } from '../../../lib/supabase';
import { Alert } from 'react-native';

export const loadAvatar = async (
  avatarUrl: string,
  setAvatar: Dispatch<SetStateAction<FileObject | null>>
) => {
  const { data } = await supabase.storage
    .from('avatars')
    .download(`${avatarUrl}`);
  if (data) {
    console.log(data);
    setAvatar(data[0]);
  }
};

export const onSelectImage = async (
  userId: string,
  setAvatarName: Dispatch<SetStateAction<string | null>>
) => {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!granted) {
    return;
  }

  const options: ImagePicker.ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
  };

  const result = await ImagePicker.launchImageLibraryAsync(options);

  // Save image if not cancelled
  if (!result.canceled) {
    const img = result.assets[0];
    const base64 = await readAsStringAsync(img.uri, {
      encoding: 'base64',
    });
    const fileName = `${new Date().getTime()}.${img.type === 'image' ? 'png' : 'mp4'}`;
    const filePath = `${userId}/${fileName}`;
    // const filePath = `${userId}/${new Date().getTime()}.${
    //   img.type === 'image' ? 'png' : 'mp4'
    // }`;
    const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';

    console.log(filePath);
    const uploadResult = await supabase.storage
      .from('avatars')
      .upload(filePath, decode(base64), { contentType });
    console.log('uploadResult: ', uploadResult);

    updateProfileAvatar(userId, fileName);
    setAvatarName(fileName);
  }
};

async function updateProfileAvatar(userId: string, avatarUrl: string) {
  console.log('Updating profile from Avatar.');
  console.log(`avatarUrl: ${avatarUrl}`);
  try {
    const updates = {
      id: userId,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    };

    let { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  }
}
