import { createServerClient } from "@supabase/ssr";
import { Song } from "../../../types";
import { cookies } from "next/headers";



const getLikedSongs = async (userId : string): Promise<Song[]> => {
 
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

    // fetch likedsongs table
    const {
        data: likedSongs,
        error: likedSongsError
    }
        = await supabase
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