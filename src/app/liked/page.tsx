import React from 'react'
import LikedSongPage from './components/LikedSongPage'
import getLikedSongs from '../action/getLikedSongs'
import getUserData from '../action/getUserData';
import getPlaylistByUserId from '../action/getPlaylistsByUserId';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
const page = async () => {
  const cookiesStore = cookies();
  const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies : {
        async get(name : string) {
          return ( await cookiesStore).get(name)?.value;
        },
        async set(name : string, value : string , options) {
          (await cookiesStore).set(name , value , options);
        } , 
        async remove(name : string , options){
          (await cookiesStore).set(name , '' , options);
        }
      }
    }
  )
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  const [
    userData,
    userPlaylists,
    likedSongs
  ] = await Promise.all([
    getUserData(userId!),
    getPlaylistByUserId(userId!),
    getLikedSongs(userId!)
  ])

  return (
    <div className='w-full  md:h-[90vh] rounded-2xl bg-neutral-900 h-[85vh]  '>
      <LikedSongPage
        userData={userData}
        likedSongs={likedSongs}
        userPlaylists={userPlaylists}
      />
    </div>
  )
}

export default page