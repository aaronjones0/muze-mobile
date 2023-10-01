import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { signInWithEmail, signUpWithEmail } from './AuthLogic';
import Text from '../Text/Text';
import { useTheme } from '@shopify/restyle';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const colors = theme.colors;

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text variant='label'>Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='email@address.com'
          autoCapitalize={'none'}
          style={{ fontSize: 16, fontWeight: '500', color: colors.text1 }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Text variant='label'>Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder='Password'
          autoCapitalize={'none'}
          style={{ fontSize: 16, fontWeight: '500', color: colors.text1 }}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          color={theme.colors.primary}
          title='Sign in'
          disabled={loading}
          onPress={() => signInWithEmail(email, password, setLoading)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          color={theme.colors.primary}
          title='Sign up'
          disabled={loading}
          onPress={() => signUpWithEmail(email, password, setLoading)}
        />
      </View>
    </View>
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
