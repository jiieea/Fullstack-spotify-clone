import getSong from '@/app/action/getSong'
import React from 'react'
import Musics from './components/Musics'
const page = async() => {
 const songs = await getSong()
  return (
    <div>
      <Musics  songs={ songs }/>
    </div>
  )
}

export default page
