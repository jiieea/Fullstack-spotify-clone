import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../../types";
import { cookies } from "next/headers";
import getSong from "./getSong";

const getSongsByTitle = async(title : string) :Promise<Song[]>=> {
    const supabase =  createServerComponentClient({
        cookies : cookies
    })

    if(!title) {
        const songs = await getSong()
        return songs
    }

    const {
        data ,
        error 
    } = await supabase.from('songs').select('*').ilike('title' , `%${title}%`)
        .order("created_at" , { ascending : true})

        if(error) {
            console.log(error.message);
            return [];
        }

        return data as Song[] || []
}


export default getSongsByTitle;