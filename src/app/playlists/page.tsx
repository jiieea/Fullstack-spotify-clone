import React from 'react'
import PlaylistContainer from './components/PlaylistContainer'
import getPlaylists from '../action/getPlaylists'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import getUserData from '../action/getUserData'
const page = async() => {
  const cookiesStore = cookies;
  const supabase = createServerComponentClient({ cookies : cookiesStore});
  const playlists = await getPlaylists();
  const { data }  = await supabase.auth.getUser();
  const userId = data.user?.id
  const [
    userData 
  ] = await Promise.all([
    getUserData(userId!)
  ])
  return (
    <>
      <PlaylistContainer playlists={ playlists } userData={ userData } />
    </>
  )
}

export default page
