import { Session } from '@supabase/supabase-js';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { supabase } from '../lib/supabase';
import Account from './components/Account/Account';
import Auth from './components/Auth/Auth';
import { ThemeProvider } from '@shopify/restyle';
import theme from './theme/theme';
import Box from './components/Box/Box';
import Text from './components/Text/Text';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('supabase.auth.getSession().then()');
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('supabase.auth.onAuthStateChange()');
      setSession(session);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        backgroundColor='backgroundSurface'
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {session && session.user ? (
          <Account key={session.user.id} session={session} />
        ) : (
          <Auth />
        )}
        <StatusBar style='auto' />
      </Box>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
