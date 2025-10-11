import getPlaylistById from '@/app/action/getPlaylistById';
import React from 'react'
import getUserData from '@/app/action/getUserData';
import PlaylistHeader from './components/PlaylistHeader';
import getPlaylistByUserId from '@/app/action/getPlaylistsByUserId';
// interface 
interface PageProps {
  params: Promise<{ id: string }>
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const playlistData = await getPlaylistById(id);
  const userData = await getUserData();
  const userPlaylists = await getPlaylistByUserId()
  return (
    <div className='w-full h-[90vh] rounded-2xl overflow-y-auto bg-neutral-900'>
      <PlaylistHeader data={playlistData} userData={userData} 
        userPlaylists = { userPlaylists }
      />
      
    </div>
  )
}

export default page