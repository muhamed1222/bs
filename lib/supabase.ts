import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Создаем заглушку для Supabase клиента
const createMockSupabaseClient = () => ({
  from: (table: string) => ({
    insert: async (data: any) => ({ data: null, error: null }),
    select: () => ({
      order: (column: string, { ascending }: { ascending: boolean }) => ({
        limit: async (count: number) => ({ data: [], error: null }),
      }),
    }),
  }),
  auth: {
    persistSession: false,
  },
});

// Создаем реальный или моковый клиент в зависимости от наличия переменных окружения
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
  : createMockSupabaseClient(); 