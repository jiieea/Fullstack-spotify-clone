import { Song } from "../types";
import { supabaseClient } from "./supabaseClient";

const getPlaylistSongs = async (playlistId: string): Promise<Song[]> => {
    if (!playlistId) {
        return []
    }

    const {
        data: playlistSongs,
        error: playlistError
    } = await supabaseClient.from('playlist_songs')
        .select('* , songs(*)')
        .eq('id', playlistId)
        .order('created_at', { ascending: true })

    if (playlistError) {
        console.log(playlistError.message);
        return []
    }


    return playlistSongs.map((song) => ({
        ...song.songs,
    }));
}

export default getPlaylistSongs