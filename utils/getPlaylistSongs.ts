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
        .eq('playlist_id', playlistId)
        .order('created_at', { ascending: true })

    if (playlistError) {
        console.log(playlistError.message);
        return []
    }


    return playlistSongs.map((song) => ({
        id: String(song.songs.id),
        user_id: song.songs.user_id ?? '',
        title: song.songs.title ?? '',
        author: song.songs.author ?? '',
        song_path: song.songs.song_path ?? '',
        image_path: song.songs.image_path ?? '',
        created_at: song.songs.created_at,
    }));
}

export default getPlaylistSongs