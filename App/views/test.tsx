import { FileObject } from '@supabase/storage-js';
import { useEffect, useState } from 'react';
import { Button, ScrollView } from 'react-native';
import { useAuth } from '../../lib/providers/AuthProvider';
import { supabase } from '../../lib/supabase';
import Box from '../components/Box/Box';
import ImageBox from '../components/ImageBox/ImageBox';
import { useTheme } from '@shopify/restyle';

export default function Test({ navigation }) {
  const bucket = 'avatars';
  const { user } = useAuth();
  const [avatar, setAvatar] = useState<FileObject | null>(null);
  const [avatars, setAvatars] = useState<FileObject[] | null>(null);
  const theme = useTheme();

  useEffect(() => {
    if (!user) return;

    // Load user images
    loadAvatar();
  }, [user]);

  const loadAvatar = async () => {
    const { data } = await supabase.storage.from('avatars').list(user!.id);
    if (data) {
      setAvatar(data[0]);
      setAvatars(data);
    }
  };

  const onRemoveImage = async (item: FileObject, listIndex: number) => {
    supabase.storage.from('avatars').remove([`${user!.id}/${item.name}`]);
    const newAvatars = [...avatars];
    newAvatars.splice(listIndex, 1);
    setAvatars(newAvatars);
  };

  return (
    <Box
      backgroundColor='backgroundSurface'
      height='100%'
      flex={1}
      flexDirection='column'
      justifyContent='space-between'
    >
      <Button
        title='Home'
        onPress={() => navigation.navigate('Home')}
        color={theme.colors.primary}
      ></Button>
      {!!avatars && (
        <ScrollView>
          {avatars.map((item, index) => (
            <ImageBox
              key={item.id}
              item={item}
              bucket={bucket}
              path={user.id}
              onRemoveImage={() => onRemoveImage(item, index)}
            />
          ))}
        </ScrollView>
      )}
    </Box>
  );
}
