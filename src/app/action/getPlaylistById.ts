import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Playlist } from "../../../types";


const getPlaylistById = async (playlistId: string): Promise<Playlist | null> => {
    const supabaseClient = createServerComponentClient({
        cookies: cookies
    });

    if (!playlistId) {
        return null;
    }

    try {
        const {
            data: fetchData,
            error: fetchError
        } = await supabaseClient.from('playlist')
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