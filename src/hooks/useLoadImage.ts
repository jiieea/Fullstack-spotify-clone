import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Playlist, Song } from "../../types";
import { useEffect, useState } from "react";

const useLoadImage = (song: Song) => {
    const supabaseClient = useSupabaseClient()

    if (!song) {
        return;
    }

    const { data: imageData } =
        supabaseClient.storage
            .from('images')
            .getPublicUrl(song.image_path);
    return imageData.publicUrl;
}


// Assuming useLoadPlaylistImage looks something like this:


const useLoadDailyPlaylist = (playlistImage : string | null | undefined): string | null => {
    const supabaseClient = useSupabaseClient();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        // Check if playlistImage is null, undefined, or empty string
        if (!playlistImage) {
            setImageUrl(null);
            return;
        }

        // Safely call Supabase to get public URL
        // Note: getPublicUrl is synchronous and always returns data
        const { data } = supabaseClient
            .storage
            .from('playlists') // Fixed: Changed from 'playlist' to 'playlists' (plural)
            .getPublicUrl(playlistImage);

        // Update state with the public URL
        if (data?.publicUrl) {
            setImageUrl(data.publicUrl);
        } else {
            setImageUrl(null);
        }

    }, [playlistImage, supabaseClient]); // Re-run when playlistImage changes

    return imageUrl;
};


const useLoadPlaylistImage = (playlist: Playlist): string | null => {
    const supabase = useSupabaseClient()
    if (!playlist.playlist_image) {
        return null;
    }

    try {
        const { data: playlistImg } = supabase.storage
            .from('playlists').getPublicUrl(playlist.playlist_image);
        if (playlistImg === null) {
            return null;
        }
        return playlistImg.publicUrl
    }catch {
        console.log("failed get playlist image");
        return null
    }
}

export {
    useLoadImage,
    useLoadPlaylistImage,
    useLoadDailyPlaylist
};