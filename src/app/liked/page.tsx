import React from 'react'
import LikedSongPage from './components/LikedSongPage'
import getLikedSongs from '../action/getLikedSongs'
import getUserData from '../action/getUserData';
const page = async() => {
  const likedSong = await getLikedSongs();
  const userData = await getUserData();
  return (
      <div className='w-full h-[90vh] rounded-2xl bg-neutral-900'>
        <LikedSongPage  
        userData = { userData }
      likedSongs ={ likedSong}/>
      </div>
  )
}

export default page