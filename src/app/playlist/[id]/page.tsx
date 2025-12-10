import getPlaylistById from '@/app/action/getPlaylistById';
import React from 'react'
import getUserData from '@/app/action/getUserData';
import PlaylistHeader from './components/PlaylistHeader';
import getPlaylistByUserId from '@/app/action/getPlaylistsByUserId';
import getPlaylistSongs from '@/app/action/getPlaylistSong';
import getPlaylistOwner from '@/app/action/getPlaylistOwner';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import getSong from '@/app/action/getSong';

interface PageProps {
  params: Promise<{ id: string }>
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
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
       async remove(name : string, options) {
         (await cookiesStore).set(name, '', options);
       }
        },
      },
  );
  const playlistData = await getPlaylistById(id);
  const playlistSongs = await getPlaylistSongs(id);
  const playlistOwner = await getPlaylistOwner(id);
  const { data } = await supabase.auth.getUser()
  const userId = data.user?.id;
  const allSongs = await getSong();
  const [
    userData ,
    userPlaylists,
  ] = await Promise.all([
    getUserData(userId!),
    getPlaylistByUserId(userId!)
  ])
  return (
    <div className='w-full  md:h-full rounded-2xl  bg-neutral-900 h-[85vh] '>
      <PlaylistHeader data={playlistData} userData={userData} 
        userPlaylists = { userPlaylists } songs={ playlistSongs}
        userName={ playlistOwner!}
        allSongs={ allSongs }
      />
      
    </div>
  )
}

export default page

