// utils/playlistActions.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

export async function addSongToPlaylist(
  supabase: SupabaseClient,
  playlistId: string,
  songId: string,
  onSuccess?: () => void
) {
  try {
    // Check if song already exists
    const { data: existingData, error: errorData } = await supabase
      .from('playlist_songs')
      .select('playlist_id')
      .eq('playlist_id', playlistId)
      .eq('song_id', songId)
      .maybeSingle();

    if (errorData) {
      toast.error(errorData.message);
      return;
    }

    if (existingData) {
      toast.error('The song is already in the playlist');
      return;
    }

    // Insert song
    const { error: insertError } = await supabase.from('playlist_songs').insert({
      song_id: songId,
      playlist_id: playlistId,
    });

    if (insertError) {
      toast.error(insertError.message);
    } else {
      toast.success('Song added to playlist');
      if (onSuccess) onSuccess();
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      toast.error(e.message);
    }
  }
}