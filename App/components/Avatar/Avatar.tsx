import { useTheme } from '@shopify/restyle';
import { FileObject } from '@supabase/storage-js';
import { decode } from 'base64-arraybuffer';
import { readAsStringAsync } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, View } from 'react-native';
import DocumentPicker, {
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import { useAuth } from '../../../lib/providers/AuthProvider';
import { supabase } from '../../../lib/supabase';
import Box from '../Box/Box';

interface Props {
  url: string | null;
  size: number;
  onUpload: (filePath: string) => void;
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState<FileObject | null>(null);

  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  const theme = useTheme();

  useEffect(() => {
    if (!user) return;

    // Load user avatar
    loadAvatar(user.id);
  }, [user]);

  const loadAvatar = async (userId: string) => {
    const { data } = await supabase.storage.from('avatars').list(userId);
    if (data) {
      console.log(data);
      setAvatar(data[0]);
    }
  };

  const onSelectImage = async () => {
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
      const filePath = `${user!.id}/${new Date().getTime()}.${
        img.type === 'image' ? 'png' : 'mp4'
      }`;
      const contentType = img.type === 'image' ? 'image/png' : 'video/mp4';
      await supabase.storage
        .from('avatars')
        .upload(filePath, decode(base64), { contentType });
      loadAvatar(user.id);
    }
  };

  const onRemoveImage = async (item: FileObject) => {
    supabase.storage.from('avatars').remove([`${user!.id}/${item.name}`]);
    setAvatar(null);
  };

  // useEffect(() => {
  //   if (url) downloadImage(url);
  // }, [url]);

  useEffect(() => {
    if (!user || !avatar) return;

    supabase.storage
      .from('avatars')
      .download(`${user.id}/${avatar.name}`)
      .then(({ data }) => {
        const fr = new FileReader();
        console.log(`readAsDataURL(${data})`);
        fr.readAsDataURL(data);
        fr.onload = () => {
          setAvatarUrl(fr.result as string);
        };
      });
  }, [user, avatar]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const file = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: types.images,
        mode: 'open',
      });

      const photo = {
        uri: file.fileCopyUri,
        type: file.type,
        name: file.name,
      };

      const formData = new FormData();
      formData.append('file', photo.name);

      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      let { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, formData);

      if (error) {
        throw error;
      }

      console.log(`onUpload(${filePath})`);
      onUpload(filePath);
    } catch (error) {
      if (isCancel(error)) {
        console.warn('cancelled');
        // User cancelled the picker, exit any dialogs or menus and move on
      } else if (isInProgress(error)) {
        console.warn(
          'multiple pickers were opened, only the last will be considered'
        );
      } else if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <Box
      width='100%'
      height='100%'
      flex={1}
      justifyContent='flex-start'
      alignItems='center'
    >
      {!!avatar ? (
        // <ImageBox
        //   key={avatar.id}
        //   item={avatar}
        //   userId={user!.id}
        //   onRemoveImage={() => onRemoveImage(avatar)}
        //   />
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel='Avatar'
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View
          style={[
            avatarSize,
            styles.avatar,
            styles.noImage,
            {
              backgroundColor: theme.colors.cardSurface,
              borderColor: theme.colors.cardSurfaceBorder,
              borderTopWidth: 1,
              borderLeftWidth: 1,
              shadowColor: theme.colors.shadowColor,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.8,
              shadowRadius: 12,
            },
          ]}
        />
      )}
      <View>
        <Button
          title={uploading ? 'Uploading ...' : 'Upload'}
          onPress={onSelectImage}
          // onPress={uploadAvatar}
          disabled={uploading}
          color={theme.colors.primary}
        />
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 24,
    overflow: 'hidden',
    maxWidth: '100%',
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    border: '1px solid rgb(200, 200, 200)',
    borderRadius: 24,
  },
});
