import React from 'react'
import SearchSong from './components/SearchSong'
import getSong from '../action/getSong';
import getPlaylists from '../action/getPlaylists';
const page = async () => {
  const [
    songs,
    playlists,
  ] = await Promise.all([
    getSong(),
    getPlaylists()
  ])

  return (
    <>
      <SearchSong
        songs={songs}
        playlists={playlists}
      />
    </>
  )
}

export default page
