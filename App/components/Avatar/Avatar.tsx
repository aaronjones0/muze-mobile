import { useTheme } from '@shopify/restyle';
import { FileObject } from '@supabase/storage-js';
import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { useAuth } from '../../../lib/providers/AuthProvider';
import { supabase } from '../../../lib/supabase';
import Box from '../Box/Box';
import { loadAvatar, onSelectImage } from './AvatarLogic';
import ImageBox from '../ImageBox/ImageBox';
import Text from '../Text/Text';

export interface AvatarProps {
  size: number;
}

export default function Avatar({ size = 150 }: AvatarProps) {
  const { user } = useAuth();
  const theme = useTheme();

  const [avatar, setAvatar] = useState<FileObject | null>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (!user || !avatarUrl) return;

    // Load user avatar
    loadAvatar(avatarUrl, setAvatar);
    // loadAvatar(user.id, setAvatar);
  }, [user, avatarUrl]);

  useEffect(() => {
    if (!user) return;
    // if (!user || !avatar) return;

    supabase.storage
      .from('avatars')
      .download(`${user.id}/avatar.png`)
      .then(({ data }) => {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          console.log('fr.result as string: ', fr.result as string);
          setAvatarUrl(fr.result as string);
          setAvatarUri(fr.result as string);
        };
      });
  }, [user]);

  return (
    <Box
      width='100%'
      height='100%'
      flex={1}
      justifyContent='flex-start'
      alignItems='center'
    >
      {!!avatarUrl ? (
        // <ImageBox item={avatar} userId={user.id} onRemoveImage={() => {}} />
        <Box
          shadowColor='shadowColor'
          shadowOffset={{ height: 10, width: 0 }}
          shadowOpacity={0.8}
          shadowRadius={8}
        >
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel='Avatar'
            style={[
              avatarSize,
              {
                borderRadius: 24,
                overflow: 'hidden',
                borderColor: theme.colors.borderColor,
                borderWidth: 1,
              },
            ]}
          />
        </Box>
      ) : (
        <Box
          height={avatarSize.height}
          width={avatarSize.width}
          backgroundColor='cardSurface'
          borderColor='cardSurfaceBorder'
          borderRadius={24}
          borderTopWidth={1}
          borderLeftWidth={1}
          shadowColor='shadowColor'
          shadowOffset={{ width: 0, height: 4 }}
          shadowRadius={8}
          shadowOpacity={0.8}
          overflow={'hidden'}
          maxWidth={'100%'}
          flex={1}
          alignItems='center'
          justifyContent='center'
        >
          <Text variant='label'>{avatarUrl}</Text>
        </Box>
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
