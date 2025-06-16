import { createClient } from '@supabase/supabase-js';
import { env } from '../config';

const supabaseUrl = env.DATABASE_URL;
const supabaseKey = env.JWT_SECRET;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const db = {
  async query<T>(table: string, query: any = {}) {
    const { data, error } = await supabase
      .from(table)
      .select()
      .match(query);

    if (error) throw error;
    return data as T[];
  },

  async insert<T>(table: string, data: Partial<T>) {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result as T;
  },

  async update<T>(table: string, id: string | number, data: Partial<T>) {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .match({ id })
      .select()
      .single();

    if (error) throw error;
    return result as T;
  },

  async delete(table: string, id: string | number) {
    const { error } = await supabase
      .from(table)
      .delete()
      .match({ id });

    if (error) throw error;
  },
}; 