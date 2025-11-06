import React from 'react'
import LikedSongPage from './components/LikedSongPage'
import getLikedSongs from '../action/getLikedSongs'
import getUserData from '../action/getUserData';
import getPlaylistByUserId from '../action/getPlaylistsByUserId';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const page = async() => {
  const cookiesStore = cookies;
  const supabase =  createServerComponentClient({ cookies : cookiesStore })
  const { data } = await supabase.auth.getUser();
    const likedSong = await getLikedSongs();
    const userId = data.user?.id;
    
    const [
      userData,
      userPlaylists
    ] = await Promise.all([
    getUserData(userId!),
      getPlaylistByUserId(userId!)
    ])

  return (
      <div className='w-full 2xl:h-[90vh] rounded-2xl
     bg-neutral-900 h-[85vh] overflow-y-auto '>
        <LikedSongPage  
        userData = { userData }
      likedSongs ={ likedSong}
    userPlaylists = { userPlaylists }
      />
      </div>
  )
}

export default page