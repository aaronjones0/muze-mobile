import { Session } from '@supabase/supabase-js';
import { Dispatch, SetStateAction } from 'react';
import { supabase } from '../../../lib/supabase';
import { Alert } from 'react-native';

export async function getProfile(
  session: Session,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setUsername: Dispatch<SetStateAction<string>>,
  setWebsite: Dispatch<SetStateAction<string>>,
  setAvatarUrl: Dispatch<SetStateAction<string>>
) {
  try {
    setLoading(true);
    if (!session?.user) throw new Error('No user on the session!');

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', session?.user.id)
      .single();
    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      console.log('data.username: ' + data.username);
      setUsername(data.username);
      setWebsite(data.website);
      console.log('data.avatar_url: ' + data.avatar_url);
      setAvatarUrl(data.avatar_url);
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  } finally {
    setLoading(false);
  }
}

export async function updateProfile(
  {
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  },
  session: Session,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  try {
    setLoading(true);
    if (!session?.user) throw new Error('No user on the session!');

    const updates = {
      id: session?.user.id,
      username,
      website,
      avatar_url,
      updated_at: new Date(),
    };

    let { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
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
