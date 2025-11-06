import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers'
import { Playlist } from '../../../types';

const getPlaylistByUserId = async(userId : string):Promise<Playlist[]>  => {
    const supabase = createServerComponentClient({
        cookies : cookies
    });

    // fetch data from table
    const { data : playlistUser , error : playlistError } = await supabase.from('playlist')
    .select('*').eq('user_id' , userId);

    if(playlistError) {
        console.log(playlistError.message);
    }


    return ( playlistUser as Playlist[]) || [];

}

export default getPlaylistByUserId;