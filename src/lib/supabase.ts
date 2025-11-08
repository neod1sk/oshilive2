import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client:
  | ReturnType<typeof createClient<{
      scores: {
        id: string;
        uid: string;
        name: string;
        avatar: string | null;
        score: number;
        hearts: number;
        best_color: string | null;
        created_at: string;
      };
    }>>
  | null = null;

export const getSupabaseClient = () => {
  if (!url || !anonKey) {
    return null;
  }
  if (!client) {
    client = createClient(url, anonKey, {
      auth: {
        persistSession: false
      }
    });
  }
  return client;
};



