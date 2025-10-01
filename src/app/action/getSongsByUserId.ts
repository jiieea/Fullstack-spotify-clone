import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../../types";
import { cookies } from "next/headers";


const getSong = async():Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies : cookies
    })

    const { data : sessionData , error : sessionError  } = await supabase.auth.getUser();
    
    if(sessionError) {
        console.log(sessionError.message);
        return[];
    }

    const { data  , error } = await supabase.from('songs')
    .select('*')
    .eq('user_id' , sessionData.user.id);


    if(error) {
        console.log(error.message)
    }

    return data as Song[] || []
}


export default getSong;