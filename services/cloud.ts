import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { logService } from './logging/LogService';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | undefined;

export function getClient(): SupabaseClient | undefined {
  if (!client && supabaseUrl && supabaseAnonKey) {
    client = createClient(supabaseUrl, supabaseAnonKey);
    logService.info('Supabase client initialized');
  }
  return client;
}

export async function saveData(table: string, id: string, data: unknown): Promise<void> {
  const supabase = getClient();
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  const { error } = await supabase
    .from(table)
    .upsert({ id, data });

  if (error) {
    logService.error('Error saving data to Supabase', { errorMessage: error.message });
    throw error;
  }

  logService.info('Data saved successfully', { table, id });
}

export async function loadData<T>(table: string, id: string): Promise<T | null> {
  const supabase = getClient();
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  const { data, error } = await supabase
    .from(table)
    .select('data')
    .eq('id', id)
    .single();

  if (error) {
    logService.error('Error loading data from Supabase', { errorMessage: error.message });
    throw error;
  }

  return data?.data as T ?? null;
}

export async function deleteData(table: string, id: string): Promise<void> {
  const supabase = getClient();
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

  if (error) {
    logService.error('Error deleting data from Supabase', { errorMessage: error.message });
    throw error;
  }

  logService.info('Data deleted successfully', { table, id });
}
