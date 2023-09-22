import { useTheme } from '@shopify/restyle';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { supabase } from '../../../lib/supabase';
import { Theme } from '../../theme/theme';
import Avatar from '../Avatar/Avatar';
import Box from '../Box/Box';
import Text from '../Text/Text';
import { getProfile, updateProfile } from './AccountLogic';

export default function Account({
  session,
  navigation,
}: {
  session: Session;
  navigation: any;
}) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const theme = useTheme<Theme>();
  const colors = theme.colors;

  useEffect(() => {
    if (session)
      getProfile(session, setLoading, setUsername, setWebsite, setAvatarUrl);
  }, [session]);

  return (
    <Box
      backgroundColor='backgroundSurface'
      paddingTop='s20'
      paddingBottom='s40'
      paddingHorizontal='s20'
      height='100%'
      flex={1}
      flexDirection='column'
      justifyContent='space-between'
    >
      <Box
        backgroundColor='primarySurface'
        borderColor='primarySurfaceBorder'
        borderRadius={48}
        shadowColor='shadowColor'
        shadowOffset={{ width: 0, height: 12 }}
        shadowRadius={12}
        shadowOpacity={0.8}
        paddingTop='s20'
        paddingBottom='s10'
        paddingHorizontal='s20'
        borderTopWidth={1}
        borderLeftWidth={1}
        borderRightWidth={1}
        borderBottomWidth={0}
      >
        <Text variant='h1' marginBottom='s10'>
          Account
        </Text>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Box height={200}>
            <Avatar
              url={avatarUrl}
              size={150}
              onUpload={(url: string) => {
                console.log(`setAvatarUrl(${url})`);
                setAvatarUrl(url);
                console.log(`updateProfile({${username}, ${website}, ${url}})`);
                updateProfile(
                  {
                    username: username,
                    website: website,
                    avatar_url: url,
                  },
                  session,
                  setLoading
                );
              }}
            />
          </Box>
          <Text variant='label'>Email</Text>
          <TextInput
            editable={false}
            value={session?.user?.email}
            style={{ fontSize: 16, fontWeight: '500', color: colors.text1 }}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Text variant='label'>Username</Text>
          <TextInput
            value={username || ''}
            onChangeText={(text) => setUsername(text)}
            style={{ fontSize: 16, color: colors.text2 }}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            title={loading ? 'Loading ...' : 'Update'}
            onPress={() =>
              updateProfile(
                { username, website, avatar_url: avatarUrl },
                session,
                setLoading
              )
            }
            color={colors.primary}
            disabled={loading}
          />
        </View>

        <View style={styles.verticallySpaced}>
          <Button
            title='Sign Out'
            onPress={() => supabase.auth.signOut()}
            color={colors.primary}
          />
        </View>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
