import { FileObject } from '@supabase/storage-js';
import { decode } from 'base64-arraybuffer';
import { readAsStringAsync } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Dispatch, SetStateAction } from 'react';
import { supabase } from '../../../lib/supabase';

export const loadAvatar = async (
  userId: string,
  setAvatar: Dispatch<SetStateAction<FileObject | null>>
) => {
  const { data } = await supabase.storage.from('avatars').list(userId);
  if (data) {
    console.log(data);
    setAvatar(data[0]);
  }
};

export const onSelectImage = async (
  userId: string,
  setAvatar: Dispatch<SetStateAction<FileObject | null>>
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
    const filePath = `${userId}/${new Date().getTime()}.${
      img.type === 'image' ? 'png' : 'mp4'
    }`;
    const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
    await supabase.storage
      .from('avatars')
      .upload(filePath, decode(base64), { contentType });
    loadAvatar(userId, setAvatar);
  }
};
