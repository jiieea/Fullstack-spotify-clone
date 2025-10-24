import { Song } from "../../types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (song: Song) => {
    const supabase = useSupabaseClient()
    if(!song) {
        return;
    }

    const {
        data
    } = supabase.storage.from('songs')
        .getPublicUrl(song.song_path)

    return data.publicUrl;
}


export default useLoadSongUrl