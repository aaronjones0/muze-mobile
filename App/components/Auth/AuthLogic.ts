import { Dispatch, SetStateAction } from 'react';
import { supabase } from '../../../lib/supabase';
import { Alert } from 'react-native';

export async function signInWithEmail(
  email: string,
  password: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true);
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) Alert.alert(error.message);
  setLoading(false);
}

export async function signUpWithEmail(
  email: string,
  password: string,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  setLoading(true);
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) Alert.alert(error.message);
  setLoading(false);
}
