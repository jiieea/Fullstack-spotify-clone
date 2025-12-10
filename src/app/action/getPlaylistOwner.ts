import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { UserDetails } from "../../../types";
import { cookies } from "next/headers";

const getPlaylistOwner = async (playlistId: string): Promise<UserDetails | null> => {
  const cookiesStore = cookies();
  // create supabase server client
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


    try {
        const { data, error } = await supabase.from('playlist').select('users(*)').eq('id', playlistId);
        if(error ) {
            return null
        }

        if(!data || data.length == 0) {
            return null
        }

        const playlistData = data[0];
        if(playlistData.users) {
            return playlistData.users as UserDetails
        }

        return null

    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e.message)
        }
        return null
    }
}



export default getPlaylistOwner;