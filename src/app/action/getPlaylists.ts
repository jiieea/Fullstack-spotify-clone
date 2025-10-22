import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Playlist } from "../../../types";
import { cookies } from "next/headers";

const getPlaylists = async (): Promise<Playlist[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })


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