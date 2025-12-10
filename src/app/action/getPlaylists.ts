import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { Playlist } from "../../../types";
import { cookies } from "next/headers";

const getPlaylists = async (): Promise<Playlist[]> => {
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
                async remove(name: string, options) {
                    (await cookiesStore).set(name, '', options);
                }
            },
        },
    );


    try {
        const { data: playlists,
            error: playlistsError
        } = await supabase.from('playlist').
            select('*').
            order('created_at', { ascending: true })

        if (playlistsError) {
            console.log(playlistsError.message);
            return []
        }

        return (playlists as Playlist[]) || []
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e.message)
        }
        return [];
    }
}


export default getPlaylists;