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
    <div className='w-full 2xl:h-[90vh] rounded-2xl overflow-y-auto bg-neutral-900 h-[85vh] '>
      <AccountHeader
        songs={songs}
        data={data}
      />
      <AccountPage
        songs={songs}
        userData ={ data }
        playlists={playlists}
      />
    </div>
  )
}

export default page
