import { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner"
import { Song } from "../types";

const removeSongFromPlaylist = async (
    songId: string,
    supabase: SupabaseClient,
    playlistId: string,
    setPlaylistSong : Dispatch<SetStateAction<Song[]>>,
    onSuccess : () => void
) => {
    try {
        const {
            error
        } = await supabase.from("playlist_songs")
            .delete().eq('song_id', songId).eq('playlist_id', playlistId)

        if (error) {
            toast.error('failed to delete song');
            return;
        }

        toast.success('song has been removed from the playlist');
        setPlaylistSong((songs)=> songs.filter((song) => song.id !== songId));
        if(onSuccess) {
            onSuccess()
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            toast.error(e.message);
        }
    }
}


export default removeSongFromPlaylist;