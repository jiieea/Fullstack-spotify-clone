import React from 'react'
import AccountHeader from './components/AccountHeader'
import getUserData from '../action/getUserData'
import getSongByUserId from '../action/getSongsByUserId';
import AccountPage from './components/AccountPage';
import getPlaylistByUserId from '../action/getPlaylistsByUserId';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

const page = async () => {
  const cookiesStore = cookies;
  const supabase = createServerComponentClient({ cookies : cookiesStore});
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const userId = userData.user?.id;


  
    const [
      userSongs,
      dataUser,
      userPlaylists
    ] = await Promise.all([
      getSongByUserId(userId!),
      getUserData(userId!),
      getPlaylistByUserId(userId!)
    ])
  return (
    <div className='w-full 2xl:h-[90vh] rounded-2xl overflow-y-auto bg-neutral-900 h-[85vh] '>
      <AccountHeader
        songs={userSongs}
        data={dataUser}
      />
      {
        !userData.user || userError && (
          <div>login untuk lihat data</div>
        )
      }
      <AccountPage
        songs={userSongs}
        userData ={ dataUser }
        playlists={userPlaylists}
      />
    </div>
  )
}

export default page
