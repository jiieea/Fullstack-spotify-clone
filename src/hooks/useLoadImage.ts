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


const useLoadDailyPlaylist = (playlistImage : string | null): string | null => {
    const supabaseClient = useSupabaseClient();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        // 1. Check for null playlistData (Initial Render)
        if (!playlistImage) {
            setImageUrl(null);
            return;
        }

        // 2. Check for undefined playlist_image (The Error Condition)
        // Ensure playlist.playlist_image is a string before proceeding.
        if (!playlistImage) {
            setImageUrl(null);
            return;
        }

        // 3. Safely call Supabase
        // Since imagePath is confirmed to be a string, this is now safe.
        const { data } = supabaseClient
            .storage
            .from('playlist')
            .getPublicUrl(playlistImage); // <--- imagePath is now guaranteed 'string'

        // 4. Update state with the public URL
        if (data && data.publicUrl) {
            setImageUrl(data.publicUrl);
        }

    }, [playlistImage, supabaseClient]); // Re-run when the playlist object changes

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