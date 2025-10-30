import getPlaylistById from '@/app/action/getPlaylistById';
import React from 'react'
import getUserData from '@/app/action/getUserData';
import PlaylistHeader from './components/PlaylistHeader';
import getPlaylistByUserId from '@/app/action/getPlaylistsByUserId';
import getPlaylistSongs from '@/app/action/getPlaylistSong';
// interface 
interface PageProps {
  params: Promise<{ id: string }>
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const playlistData = await getPlaylistById(id);
  const userData = await getUserData();
  const userPlaylists = await getPlaylistByUserId();
  const playlistSongs = await getPlaylistSongs(id);

  return (
    <div className='w-full  2xl:h-[90vh] rounded-2xl overflow-y-auto bg-neutral-900 h-[85vh]'>
      <PlaylistHeader data={playlistData} userData={userData} 
        userPlaylists = { userPlaylists } songs={ playlistSongs}
      />
      
    </div>
  )
}

export default page