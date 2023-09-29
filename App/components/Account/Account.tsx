import { useTheme } from '@shopify/restyle';
import { Session } from '@supabase/supabase-js';
import { Alert, Button, Image, TextInput } from 'react-native';
import { Theme } from '../../theme/theme';
import Box from '../Box/Box';
import Text from '../Text/Text';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function Account({
  session,
  navigation,
}: {
  session: Session;
  navigation: any;
}) {
  const avatarSize = 150;

  const theme = useTheme<Theme>();
  const colors = theme.colors;

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [avatarFileName, setAvatarFileName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  useEffect(() => {
    if (!!avatarFileName) {
      downloadAvatar(avatarFileName);
    }
  }, [avatarFileName]);

  async function downloadAvatar(avatarFileName: string) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(`${session.user.id}/${avatarFileName}`);

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

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarFileName(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(username: string, avatarFileName: string) {
    try {
      setLoading(true);

      const updates = {
        id: session.user.id,
        username: username,
        avatar_url: avatarFileName,
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (!!error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      backgroundColor='backgroundSurface'
      paddingTop='s10'
      paddingBottom='s40'
      paddingHorizontal='s10'
      height='100%'
      flex={1}
      flexDirection='column'
      justifyContent='space-between'
      gap='s10'
    >
      <Box
        backgroundColor='primarySurface'
        borderColor='primarySurfaceBorder'
        borderRadius={48}
        shadowColor='shadowColor'
        shadowOffset={{ width: 0, height: 12 }}
        shadowRadius={12}
        shadowOpacity={0.8}
        paddingVertical='s10'
        paddingHorizontal='s14'
        borderTopWidth={1}
        borderLeftWidth={1}
        borderRightWidth={1}
        borderBottomWidth={0}
        flex={1}
        flexDirection='column'
        gap='s5'
      >
        <Text variant='h1' textAlign='center'>
          {username}
        </Text>
        <Box flex={1} flexDirection='column' gap='s6'>
          <Box
            width={avatarSize}
            height={avatarSize}
            alignSelf='center'
            shadowColor='shadowColor'
            shadowOffset={{ width: 0, height: 6 }}
            shadowOpacity={1}
            shadowRadius={12}
          >
            {!loading ? (
              <Image
                style={{
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: colors.shadowColor,
                }}
                source={{ uri: avatarUrl }}
              />
            ) : (
              <Text variant='body'>Loading...</Text>
            )}
          </Box>
          <Box
            paddingVertical='s4'
            paddingHorizontal='s6'
            borderWidth={1}
            borderColor='primarySurfaceBorder'
            borderRadius={16}
          >
            <Text color='text2'>Email</Text>
            <TextInput
              value={session?.user?.email}
              editable={false}
              style={{ color: colors.text1, fontSize: 16 }}
            />
          </Box>
          <Box
            paddingVertical='s4'
            paddingHorizontal='s6'
            borderWidth={1}
            borderColor='primarySurfaceBorder'
            borderRadius={16}
            backgroundColor={
              !editingProfile ? 'primarySurface' : 'backgroundSurface'
            }
          >
            <Text color='text2'>Username</Text>
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              editable={editingProfile}
              style={{ color: colors.text1, fontSize: 16 }}
            />
          </Box>
        </Box>
        <Box>
          {!editingProfile ? (
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
            >
              <Button
                title='Edit'
                onPress={() => setEditingProfile(true)}
                color={theme.colors.text2}
              />
            </Box>
          ) : (
            <Box flexDirection='row' width='100%' gap='s10'>
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
                  onPress={() => {
                    setEditingProfile(false);
                    updateProfile(username, avatarFileName);
                  }}
                  color={theme.colors.text2}
                />
              </Box>
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
                  title='Cancel'
                  onPress={() => setEditingProfile(false)}
                  color={theme.colors.text2}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
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
      >
        <Button
          title='Home'
          onPress={() => navigation.navigate('Home')}
          color={theme.colors.primary}
        />
      </Box>
    </Box>
  );
}
