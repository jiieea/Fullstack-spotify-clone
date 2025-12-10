import { createServerClient } from '@supabase/auth-helpers-nextjs'

import { cookies } from 'next/headers'
import { Playlist } from '../../../types';

const getPlaylistByUserId = async (userId: string): Promise<Playlist[]> => {
    const cookiesStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                async get(name: string) {
                    return (await cookiesStore).get(name)?.value;
                },
                async set(name: string, value: string, options) {
                    (await cookiesStore).set(name, value, options);
                },
                async remove(name: string, options) {
                    (await cookiesStore).set(name, '', options);
                }
            },
        },
    );
    // fetch data from table
    const { data: playlistUser, error: playlistError } = await supabase.from('playlist')
        .select('*').eq('user_id', userId);

    if (playlistError) {
        console.log(playlistError.message);
    }


    return (playlistUser as Playlist[]) || [];

}

export default getPlaylistByUserId;