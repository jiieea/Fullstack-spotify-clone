import React from 'react'
import AccountHeader from './components/AccountHeader'
import getUserData from '../action/getUserData'
import getSong from '../action/getSongsByUserId';
import AccountPage from './components/AccountPage';
import getPlaylistByUserId from '../action/getPlaylistsByUserId';

const page = async () => {
  const data = await getUserData();
  const songs = await getSong();
  const playlists = await getPlaylistByUserId()

  
  return (
    <div className='w-full h-[90vh] overflow-y-auto  bg-neutral-900 rounded-md  md:mb-0 '>
      <AccountHeader
        songs={songs}
        data={data}
      />
      <AccountPage
        songs={songs}
        playlists={playlists}
      />
    </div>
  )
}

export default page
