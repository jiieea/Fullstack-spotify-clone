import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../../types";
import { cookies } from "next/headers";


const getSongsByGenre = async(genre : string) : Promise<Song[] | null> => {
    const supabase = createServerComponentClient({
        cookies : cookies
    })
    const targetPattern = `%${genre}%`;

    const { 
        data,
        error
    }= await supabase.from('songs').select('*').ilike('genre' , targetPattern);

    if(error) {
        console.log("failed to fetch" + error.message);
        return []
    }

    return data as Song[] | null;
} 


export default getSongsByGenre;