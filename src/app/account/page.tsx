import React from 'react'
import AccountHeader from './components/AccountHeader'
import getUserData from '../action/getUserData'
import getSongByUserId from '../action/getSongsByUserId';
import AccountPage from './components/AccountPage';
import getPlaylistByUserId from '../action/getPlaylistsByUserId';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

const page = async () => {
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
        async remove(name: string, options) {
          (await cookiesStore).set(name, '', options);
        }
      }
    }
  )
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
    <div className='w-full 2xl:h-[90vh] rounded-2xl  bg-neutral-900 h-[85vh] '>
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
