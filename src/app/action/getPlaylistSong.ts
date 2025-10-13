// actions/getPlaylistSongs.ts

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "../../../types";

const getPlaylistSongs = async (playlistId: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!playlistId) {
        return [];
    }

    const { data: playlistSongs, error: errorPlaylist } = await supabase
        .from('playlist_songs')
        .select("*, songs(*)")
        .eq('playlist_id', playlistId) // Filter by the specific playlist ID
        .order('created_at', { ascending: false });

    if (errorPlaylist) {
        console.error("Error fetching playlist songs:", errorPlaylist);
        return [];
    }

    if (!playlistSongs) {
        return [];
    }

    return playlistSongs.map((song) => ({
        ...song.songs,
    }));
};

export default getPlaylistSongs;