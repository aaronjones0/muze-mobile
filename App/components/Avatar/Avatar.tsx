import { useTheme } from '@shopify/restyle';
import { FileObject } from '@supabase/storage-js';
import { useEffect, useState } from 'react';
import { Button, Image, View } from 'react-native';
import { useAuth } from '../../../lib/providers/AuthProvider';
import { supabase } from '../../../lib/supabase';
import Box from '../Box/Box';
import Text from '../Text/Text';
import { onSelectImage } from './AvatarLogic';

export interface AvatarProps {
  size: number;
  onAvatarChanged: (avatarUrl: string) => void;
}

export default function Avatar({ size = 150, onAvatarChanged }: AvatarProps) {
  const { user } = useAuth();
  const theme = useTheme();

  const [avatar, setAvatar] = useState<FileObject | null>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarName, setAvatarName] = useState<string | null>(null);

  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (!user) return;

    try {
      supabase.storage
        .from('avatars')
        .download(`${user.id}/${avatarName}`)
        .then(({ data }) => {
          if (!data) {
            console.log('No avatar.');
            return;
          }

          const fr = new FileReader();
          fr.readAsDataURL(data);
          fr.onload = () => {
            const url = fr.result as string;
            setAvatarUrl(url);
            onAvatarChanged(url);
          };
        });
    } catch (error) {
      console.error(error);
    }
  }, [user, avatarUrl, avatarName]);

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
                borderColor: theme.colors.backgroundSurfaceBorder,
                borderWidth: 1,
              },
            ]}
            alt='User Avatar Image'
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
          <Text variant='label'>(None)</Text>
        </Box>
      )}
      <View>
        <Button
          title={uploading ? 'Uploading ...' : 'Upload'}
          onPress={() => {
            onSelectImage(user.id, setAvatarName);
          }}
          disabled={uploading}
          color={theme.colors.primary}
        />
      </View>
      <View>
        <Button
          title={'Remove'}
          onPress={() => {
            try {
              const result = supabase.storage
                .from('avatars')
                .remove([`${user.id}/${avatarName}`]);
              console.log('result: ' + result);
              setAvatarUrl(null);
            } catch (error) {
              console.error(
                'An error occurred while trying to delete your avatar.'
              );
              console.error(error);
            }
          }}
          disabled={uploading}
          color={theme.colors.primary}
        />
      </View>
    </Box>
  );
}
