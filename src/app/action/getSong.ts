import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../../types";
import { cookies } from "next/headers";


const getSong = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    try {
        const { data, error } = await supabase.from('songs')
            .select('*')
            .order('created_at', { ascending: true })

        if (error) {
            console.log(error.message)
        }

        return data as Song[] || []
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }

    return []
}



export default getSong;