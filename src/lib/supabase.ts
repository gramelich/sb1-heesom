import { createClient } from '@supabase/supabase-js';

let supabaseClient: ReturnType<typeof createClient> | null = null;

export const initSupabase = (url: string, key: string) => {
  supabaseClient = createClient(url, key);
  return supabaseClient;
};

export const getSupabase = () => {
  if (!supabaseClient) {
    throw new Error('Supabase não foi inicializado. Configure as credenciais nas configurações.');
  }
  return supabaseClient;
};