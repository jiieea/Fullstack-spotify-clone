import getPlaylists from '@/app/action/getPlaylists'
import Playlists from './component/Playlists'
import React from 'react'
const page =async () => {
    const playlists = await getPlaylists();
  return (
    <div>
      <Playlists playlists={ playlists }/>
    </div>
  )
}

export default page
