import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../../types";
import { cookies } from "next/headers";



const getLikedSongs = async (userId : string): Promise<Song[]> => {
    const supabaseClient = createServerComponentClient({
        cookies: cookies
    })

    // fetch likedsongs table
    const {
        data: likedSongs,
        error: likedSongsError
    }
        = await supabaseClient
            .from('liked_songs')
            .select("* , songs(*)")
            .eq('user_id', userId)
            .order('created_at', { ascending: true })

    if (likedSongsError) {
        console.log(likedSongsError.message);
        return []
    }

    if (!likedSongs) {
        return []
    }

    return likedSongs.map((song) => ({
        ...song.songs,
    }));


}


export default getLikedSongs