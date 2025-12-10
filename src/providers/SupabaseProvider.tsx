// SupabaseProvider.tsx (or .jsx)
"use client";

import React, { useState } from "react";
// 1. UPDATE: Import the new client function from @supabase/ssr
import { createBrowserClient } from "@supabase/ssr"; 
// 2. KEEP: This provides the context for useSession, etc.
import { SessionContextProvider } from "@supabase/auth-helpers-react"; 

interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  // 3. UPDATE: Use the new createBrowserClient function
  // It requires the URL and Anon Key from your environment variables
  const [supabaseClient] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;