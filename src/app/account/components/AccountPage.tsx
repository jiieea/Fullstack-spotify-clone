import React from 'react'
import MediaItem from '@/components/MediaItem'
import { AccountPageProps } from '../../interfaces/types'

const AccountPage: React.FC<AccountPageProps> = (
    {
        songs,
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
        </div>
    )
}

export default AccountPage;
