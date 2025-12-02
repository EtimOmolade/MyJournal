import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

let client;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase keys are missing! Check your environment variables.");
  // Return a dummy client to prevent app crash on startup
  client = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: new Error("Supabase keys missing") }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
      signUp: () => Promise.resolve({ error: new Error("Supabase keys missing") }),
      signInWithPassword: () => Promise.resolve({ error: new Error("Supabase keys missing") }),
      signOut: () => Promise.resolve({ error: new Error("Supabase keys missing") }),
    },
    from: () => ({
      select: () => Promise.resolve({ data: null, error: new Error("Supabase keys missing") }),
      insert: () => Promise.resolve({ data: null, error: new Error("Supabase keys missing") }),
      update: () => Promise.resolve({ data: null, error: new Error("Supabase keys missing") }),
      delete: () => Promise.resolve({ data: null, error: new Error("Supabase keys missing") }),
      eq: () => Promise.resolve({ data: null, error: new Error("Supabase keys missing") }),
    }),
  };
} else {
  client = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = client;