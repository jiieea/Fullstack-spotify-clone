import getPlaylistByUserId from '@/app/action/getPlaylistsByUserId'
import getSongByUserId from '@/app/action/getSongsByUserId';

import LibraryChildComponent from './components/LibraryChildComponent';
import getUserData from '../action/getUserData';
import getLikedSongs from '../action/getLikedSongs';
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
       async remove(name : string, options) {
         (await cookiesStore).set(name, '', options);
       }
        },
      },
  );
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id

  const [
    dataUser,
    userPlaylists,
    userSongs,
    likedSongs
  ]= await Promise.all([
    getUserData(userId!),
    getPlaylistByUserId(userId!),
    getSongByUserId(userId!),
    getLikedSongs(userId!)
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
