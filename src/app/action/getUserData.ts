// (Likely in a file like: ./action/getUserData.ts)

// 1. UPDATE: Import the new client from @supabase/ssr
import { createServerClient } from "@supabase/ssr"; 
import { UserDetails } from '../../../types';
// 2. KEEP: This provides the required cookie store access
import { cookies } from "next/headers"; 

const getUserData = async (userId: string): Promise<UserDetails | null> => {
    
    // 3. FIX: cookies is a function, and we need its result
    const cookiesStore = cookies(); 

    // 4. UPDATE: Initialize Supabase client using the new function
    // This requires your environment variables and the explicit cookie interface
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookiesStore).get(name)?.value;
        },
        async set(name: string, value: string, options) {
          (await cookiesStore).set(name, value, options);
        },
       async remove(name : string, options) {
         (await cookiesStore).set(name, '', options);
       }
        },
      },
  );

    // fetch data from users table
    try {
        const {
            data: userDetails,
            error: fetchError
        } =
            await supabase.from('users')
                .select('*')
                .eq('id', userId)

        if (fetchError) {
            console.log(fetchError.message)
        }

        // if userDetails exist we return
        if (userDetails && userDetails.length > 0) {
            return userDetails[0] as UserDetails
        } else {
            console.log('no user data in this session with user id ', userId)
            return null
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
    return null
}

export default getUserData;