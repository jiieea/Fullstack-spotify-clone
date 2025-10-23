import React from 'react'
import LikedSongPage from './components/LikedSongPage'
import getLikedSongs from '../action/getLikedSongs'
import getUserData from '../action/getUserData';
import getPlaylistByUserId from '../action/getPlaylistsByUserId';

const page = async() => {
  const likedSong = await getLikedSongs();
  const userData = await getUserData();
  const userPlaylists = await getPlaylistByUserId();
  

  return (
      <div className='w-full 2xl:h-[90vh] h-[80vh] rounded-2xl bg-neutral-900 overflow-y-auto'>
        <LikedSongPage  
        userData = { userData }
      likedSongs ={ likedSong}
    userPlaylists = { userPlaylists }
      />
      </div>
  )
}

export default page