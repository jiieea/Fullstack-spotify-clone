import React from 'react'
import PlaylistContainer from './components/PlaylistContainer'
import getPlaylists from '../action/getPlaylists'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import getUserData from '../action/getUserData'
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
      },
    },
  );
  const playlists = await getPlaylists();
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id
  const [
    userData
  ] = await Promise.all([
    getUserData(userId!)
  ])
  return (
    <>
      <PlaylistContainer playlists={playlists} userData={userData} />
    </>
  )
}

export default page
