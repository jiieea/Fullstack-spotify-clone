import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Playlist, Song } from "../../types";


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


const useLoadPlaylistImage = (playlist: Playlist) => {
    const supabase = useSupabaseClient();

    // Check if the image path exists
    if (!playlist.playlist_image) {
        return null; // or a default image URL
    }

    const { data: playlistImage } = supabase.storage
        .from('playlists')
        .getPublicUrl(playlist.playlist_image);

    return playlistImage.publicUrl;
}


export  {
    useLoadImage ,
    useLoadPlaylistImage
};