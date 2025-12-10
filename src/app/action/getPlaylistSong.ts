"use server"

// actions/getPlaylistSongs.ts

import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "../../../types";

const getPlaylistSongs = async (playlistId: string): Promise<Song[]> => {
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
        id: String(song.songs.id),
        user_id: song.songs.user_id ?? '',
        title: song.songs.title ?? '',
        author: song.songs.author ?? '',
        song_path: song.songs.song_path ?? '',
        image_path: song.songs.image_path ?? '',
        created_at: song.songs.created_at,
    }));
};

export default getPlaylistSongs;