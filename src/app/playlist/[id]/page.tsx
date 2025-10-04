import getPlaylistById from '@/app/action/getPlaylistById';
import React from 'react'
import getUserData from '@/app/action/getUserData';
import PlaylistHeader from './components/PlaylistHeader';
// interface 
interface PageProps {
  params: Promise<{ id: string }>
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const playlistData = await getPlaylistById(id);
  const userData = await getUserData()

  return (
    <div className='w-full h-full rounded-2xl bg-neutral-900'>
      <PlaylistHeader data={playlistData} userData={userData} />
      
    </div>
  )
}

export default page