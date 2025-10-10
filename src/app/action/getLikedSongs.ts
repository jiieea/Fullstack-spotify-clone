import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../../types";
import { cookies } from "next/headers";



const getLikedSongs = async (): Promise<Song[]> => {
    const supabaseClient = createServerComponentClient({
        cookies: cookies
    })


    const {
        data: {
            user
        },
    } = await supabaseClient.auth.getUser();



    // fetch likedsongs table
    const {
        data: likedSongs,
        error: likedSongsError
    }
        = await supabaseClient
            .from('liked_songs')
            .select("* , songs(*)")
            .eq('user_id', user?.id)
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