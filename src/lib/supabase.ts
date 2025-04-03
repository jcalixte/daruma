import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Daruma = {
  id: string;
  user_id: string;
  wish: string;
  first_eye_date: string | null;
  second_eye_date: string | null;
  created_at: string;
  color: string;
};