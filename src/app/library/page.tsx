import getPlaylistByUserId from '@/app/action/getPlaylistsByUserId'
import getSongByUserId from '@/app/action/getSongsByUserId';
import React from 'react'
import LibraryChildComponent from './components/LibraryChildComponent';
import getUserData from '../action/getUserData';
import getLikedSongs from '../action/getLikedSongs';

const page = async () => {
  const playlists = await getPlaylistByUserId();
  const userData = await getUserData();
  const songs = await getSongByUserId()
  const likedSongs = await getLikedSongs()
  return (
    <div className='w-full min-h-[85vh] bg-neutral-900 rounded-md md:hidden'>
      <LibraryChildComponent
        userData={userData}
        userPlaylists={playlists}
        userSongs={songs}
        liked={likedSongs.length}
      />
    </div>
  )
}

export default page;
