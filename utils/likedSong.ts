// use a custom hook to manage all necessary external dependencies 

import { SupabaseClient } from "@supabase/auth-helpers-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";
import { UserDetails } from "../types";
// to keep this function pure (or pass them as arguments)
interface HandleLikeSongParams {
    songId: string;
    isLiked: boolean;
    user: UserDetails | null; // Replace 'any' with your actual Supabase User type
    supabaseClient: SupabaseClient; // Replace 'any' with your actual Supabase Client type
    authModal: { onOpen: () => void };
    setIsLiked: (liked: boolean) => void;
    router : AppRouterInstance
}

/**
 * Handles the logic for liking or unliking a song.
 *
 * @param {HandleLikeSongParams} params - The parameters required for the operation.
 */
export const handleLikeSong = async ({
    songId,
    isLiked,
    user,
    supabaseClient,
    authModal,
    setIsLiked,
    router,
}: HandleLikeSongParams) => {
    // 1. Authentication Check
    if (!user) {
        // If the user is not logged in, prompt them to sign in
        return authModal.onOpen();
    }

    if (isLiked) {
        // 2. Handle Unlike (Delete operation)
        const { error } = await supabaseClient
            .from('liked_songs')
            .delete()
            .eq('user_id', user.id)
            .eq('song_id', songId);

        if (error) {
            toast.error(error.message);
        } else {
            // Success: Update state and show success message
            setIsLiked(false);
            toast.success('Unliked!');
        }
    } else {
        // 3. Handle Like (Insert operation)
        const { error } = await supabaseClient
            .from('liked_songs')
            .insert({
                user_id: user.id,
                song_id: songId,
            });

        if (error) {
            // Display error if insertion fails (e.g., due to duplicate keys)
            toast.error(error.message);
        } else {
            // Success: Update state and show success message
            setIsLiked(true);
            toast.success('Liked!');
        }
    }

    // 4. Refresh Router to update UI lists (e.g., the 'Liked Songs' page)
    router.refresh()
};