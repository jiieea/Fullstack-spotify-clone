import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Playlist } from "../../../types";


const getPlaylistById = async (playlistId: string): Promise<Playlist | null> => {
    const cookiesStore = cookies();

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
    if (!playlistId) {
        return null;
    }

    try {
        const {
            data: fetchData,
            error: fetchError
        } = await supabase.from('playlist')
            .select('*')
            .eq('id', playlistId)
            .single()

        if (fetchError) {
            console.log('failed to fetch' + fetchError.message);
            return null
        }

        return (fetchData as Playlist) || null
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e.message)
        }

        return null
    }
}


export default getPlaylistById;