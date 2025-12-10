import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import React from 'react'
import LikedSongContent from '@/app/liked/components/LikedSongContent';
import getPlaylists from '@/app/action/getPlaylists';
import getSongByUserId from '@/app/action/getSongsByUserId';
import MySongs from './components/MySongs';



const page = async () => {
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
            }
        }
    )
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    const [
        playlists,
        songs
    ] = await Promise.all([
        getPlaylists(),
        getSongByUserId(userId!)
    ])
    return (
        <div className='flex flex-col space-y-4 p-5 '>
            <div className='flex flex-col gap-y-4 px-7 py-5 mt-5'>
                <h1 className='text-white font-bold text-2xl'>You uploaded songs</h1>
                <p className='text-neutral-600 hover:text-white hover:underline transition font-semibold text-[13px]'>This visible only to you</p>
            </div>
            <LikedSongContent  >
                <MySongs playlists={playlists} songs={songs} />
            </LikedSongContent>
        </div>
    )
}


export default page;
