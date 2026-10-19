import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project') &&
  supabaseUrl.startsWith('https://')
);

// Create client if configured, otherwise null
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

/**
 * Diagnostic test to verify Supabase cloud connection
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  tables?: string[];
  latencyMs?: number;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      connected: false,
      message: 'Supabase credentials not configured in .env (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required).'
    };
  }

  const start = performance.now();
  try {
    const { error } = await supabase.from('profiles').select('id').limit(1);
    const latencyMs = Math.round(performance.now() - start);

    if (error) {
      return {
        connected: false,
        message: `Supabase responded with error: ${error.message}. Make sure migrations have been applied.`,
        latencyMs
      };
    }

    return {
      connected: true,
      message: `Successfully connected to Supabase PostgreSQL (${latencyMs}ms latency).`,
      latencyMs
    };
  } catch (err: any) {
    return {
      connected: false,
      message: `Failed to connect to Supabase: ${err.message || 'Network error'}`
    };
  }
}
