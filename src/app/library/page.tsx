import getPlaylistByUserId from '@/app/action/getPlaylistsByUserId'
import getSongByUserId from '@/app/action/getSongsByUserId';
import React from 'react'
import LibraryChildComponent from './components/LibraryChildComponent';
import getUserData from '../action/getUserData';
import getLikedSongs from '../action/getLikedSongs';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const page = async () => {
  const cookiesStore = cookies;
  const supabase = createServerComponentClient({
    cookies : cookiesStore
  })
  const { data } = await supabase.auth.getUser();
  const likedSongs = await getLikedSongs();
  const userId = data.user?.id

  const [
    dataUser,
    userPlaylists,
    userSongs
  ]= await Promise.all([
    getUserData(userId!),
    getPlaylistByUserId(userId!),
    getSongByUserId(userId!)
  ])
  return (
    <div className='w-full min-h-[85vh] bg-neutral-900 rounded-md md:hidden'>
      <LibraryChildComponent
        userData={dataUser}
        userPlaylists={userPlaylists}
        userSongs={userSongs}
        liked={likedSongs.length}
      />
    </div>
  )
}

export default page;
