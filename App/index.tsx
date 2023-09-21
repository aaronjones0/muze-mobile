import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@shopify/restyle';
import { Session } from '@supabase/supabase-js';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Account from './components/Account/Account';
import Auth from './components/Auth/Auth';
import Box from './components/Box/Box';
import theme from './theme/theme';
import Collection from './views/collection/collection';
import Home from './views/home/home';
import { AuthProvider } from '../lib/providers/AuthProvider';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Box
            backgroundColor='primarySurface'
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {session && session.user ? (
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: theme.colors.panelSurface,
                  },
                  headerTintColor: theme.colors.text1,
                  headerTitleStyle: {
                    fontWeight: '900',
                    color: theme.colors.text2,
                  },
                }}
              >
                <Stack.Screen name='Account'>
                  {(props) => (
                    <Account
                      {...props}
                      key={session.user.id}
                      session={session}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Collection' component={Collection} />
              </Stack.Navigator>
            ) : (
              <Auth />
            )}
            <StatusBar style='auto' />
          </Box>
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}
