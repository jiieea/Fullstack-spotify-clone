import React from 'react'
import MediaItem from '@/components/MediaItem'
import { AccountPageProps } from '../../interfaces/types'
import { MyPlaylist } from './MyPlaylist'



const AccountPage: React.FC<AccountPageProps> = (
    {
        songs,
        playlists
    }
) => {
    return (
        // The main content area: Uses a deep neutral background to blend with the header.
        <div className='
            min-h-screen 
            w-full
        '>
            <div className='
                // Standard Spotify content padding
                px-6 
                sm:px-8 
                lg:px-10 
                mt-8 
                space-y-2
            '>
                {/* Section Title, styled prominently */}
                <h2 className='
                    text-white 
                    text-2xl 
                    font-bold 
                    mb-4 
                    md:text-3xl
                '>
                    Your Uploaded Songs
                </h2>


                {songs.length === 0 ? (
                    <p className='text-neutral-400 text-base py-4'>
                        You haven&apos;t uploaded any songs yet.
                    </p>
                ) : (
                    songs.map((song, index) => (
                        <MediaItem data={song} key={song.id} index={index} />
                    ))
                )}


            </div>

            <div className='  px-6 
                sm:px-8 
                lg:px-10 
                mt-8 
                space-y-2'>
                <h2 className='text-white text-2xl md:text-3xl font-bold'>Your Playlists</h2>
               <div className='grid lg:grid-cols-8 md:grid-cols-4  grid-cols-2 gap-3'>
                 {
                    playlists.map((playlist) => (
                      <MyPlaylist  key={ playlist.id } data={ playlist }/>
                    ))
                }
               </div>
            </div>
        </div>
    )
}

export default AccountPage;
