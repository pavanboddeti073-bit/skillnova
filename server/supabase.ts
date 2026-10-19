import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

export const isServerSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('your-project') &&
  supabaseUrl.startsWith('https://')
);

export const serverSupabase = isServerSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false
      }
    })
  : null;

export async function checkServerSupabaseHealth(): Promise<{ connected: boolean; message: string }> {
  if (!isServerSupabaseConfigured || !serverSupabase) {
    return { connected: false, message: 'Supabase credentials not configured in environment' };
  }
  try {
    const { error } = await serverSupabase.from('profiles').select('id').limit(1);
    if (error) {
      return { connected: false, message: error.message };
    }
    return { connected: true, message: 'Supabase PostgreSQL cloud connection verified' };
  } catch (err: any) {
    return { connected: false, message: err.message || 'Supabase unreachable' };
  }
}
