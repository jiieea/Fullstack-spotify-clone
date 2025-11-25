"use client"

import React from 'react'
import { Playlist } from '../../../../../types'
import { ArrowLeftIcon } from 'lucide-react'
import DailyMixCard from '@/components/Song'
import PlaylistComponent from '../component/PlaylistComponent'
import { useRouter } from 'next/navigation'
interface PlaylistsProps {
    playlists : Playlist[]
}
const Musics: React.FC<PlaylistsProps> = (
    {
        playlists
    }
) => {
    const router = useRouter();
    const handleClick = (playlistId : string) =>{
        router.push(`/playlist/${ playlistId }`)
    }
    return (
        <>
            <div className='px-3 py-5 mt-3 bg-gradient-to-b from-green-600 to-neutral-900'>
                <div className='flex flex-col gap-y-2.5'>
                    <ArrowLeftIcon className='text-white font-semibold'onClick={() => router.back()}/>
                    <h1 className='text-white font-semibold text-3xl'>Discover the playlist</h1>
                </div>
            </div>
            <div>
                {/* content */}

               <div className='grid grid-cols-2 px-3 place-content-center mb-35'>
               {
                    playlists.map((playlist) => (
                        <div key={playlist.id}>
                            <DailyMixCard>
                                <PlaylistComponent
                                    playlist={ playlist }
                                    onHandleClick={(id: string) => handleClick(id)}
                                />
                            </DailyMixCard>
                        </div>
                    ))
                }
               </div>
            </div>
        </>
    )
}

export default Musics
