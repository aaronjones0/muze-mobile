if (!process.env.SUPABASE_URL) {
  console.log(
    'supabaseConstants.ts',
    'Make sure you have a `.env` file to populate your variables.'
  );
}

export const SUPABASE_URL = process.env.EXPO_PUBLIC_REACT_NATIVE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_REACT_NATIVE_SUPABASE_ANON_KEY;
