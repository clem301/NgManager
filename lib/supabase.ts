import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          email: string;
          password_hash: string;
          role_id: string;
          role_name: string;
          role_level: number;
          role_color: string;
          role_emoji: string;
          role_description: string;
          country_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          password_hash: string;
          role_id?: string;
          role_name?: string;
          role_level?: number;
          role_color?: string;
          role_emoji?: string;
          role_description?: string;
          country_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          password_hash?: string;
          role_id?: string;
          role_name?: string;
          role_level?: number;
          role_color?: string;
          role_emoji?: string;
          role_description?: string;
          country_id?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}
