// utils/supabaseClient.ts

import { createClient } from "@supabase/supabase-js";
import { Database } from '../types_db'; // Assuming you have your types here

// Ensure these environment variables are available on the client side
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create the Supabase client instance for client-side use
export const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);