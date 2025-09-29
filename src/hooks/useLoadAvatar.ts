import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { UserDetails } from "../../types";


const useLoadAvatar = (user: UserDetails) => {
    const supabaseClient = useSupabaseClient()

    if (!user) {
        return null;
    }

    if (!user.avatar_url) {
        return "";
    }

    const { data } = supabaseClient.storage.from('avatar').getPublicUrl(user.avatar_url);


    return data.publicUrl;
}


export default useLoadAvatar;