import { useTheme } from '@shopify/restyle';
import { FileObject } from '@supabase/storage-js';
import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { useAuth } from '../../../lib/providers/AuthProvider';
import { supabase } from '../../../lib/supabase';
import Box from '../Box/Box';
import { loadAvatar, onSelectImage } from './AvatarLogic';

export interface AvatarProps {
  size: number;
  onUpload: (filePath: string) => void;
}

export default function Avatar({ size = 150, onUpload }: AvatarProps) {
  const { user } = useAuth();
  const theme = useTheme();

  const [avatar, setAvatar] = useState<FileObject | null>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (!user) return;

    // Load user avatar
    loadAvatar(user.id, setAvatar);
  }, [user]);

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

  return (
    <Box
      width='100%'
      height='100%'
      flex={1}
      justifyContent='flex-start'
      alignItems='center'
    >
      {!!avatar ? (
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
          onPress={() => onSelectImage(user.id, setAvatar)}
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
