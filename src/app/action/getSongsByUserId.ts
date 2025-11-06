import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../../types";
import { cookies } from "next/headers";


const getSongByUserId = async(userId : string):Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies : cookies
    })

    const { data  , error } = await supabase.from('songs')
    .select('*')
    .eq('user_id' , userId);


    if(error) {
        console.log(error.message)
    }

    return data as Song[] || []
}


export default getSongByUserId;