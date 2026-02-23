import { createClient } from "@supabase/supabase-js";

// Load environment variables (Vite only)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// REAL debug (remove later if you want)
console.log("ENV Supabase URL:", supabaseUrl);
console.log("ENV Supabase Key Exists:", !!supabaseAnonKey);

// Safety checks
if (!supabaseUrl) {
  throw new Error(
    "VITE_SUPABASE_URL is missing. Check Vercel Environment Variables."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "VITE_SUPABASE_ANON_KEY is missing. Check Vercel Environment Variables."
  );
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
