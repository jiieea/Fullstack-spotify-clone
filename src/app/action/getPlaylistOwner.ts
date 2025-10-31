import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { UserDetails } from "../../../types";
import { cookies } from "next/headers";

const getPlaylistOwner = async (playlistId: string): Promise<UserDetails | null> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    try {
        const { data, error } = await supabase.from('playlist').select('users(*)').eq('id', playlistId);
        if(error ) {
            return null
        }

        if(!data || data.length == 0) {
            return null
        }

        const playlistData = data[0];
        if(playlistData.users) {
            return playlistData.users as UserDetails
        }

        return null

    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e.message)
        }
        return null
    }
}



export default getPlaylistOwner;