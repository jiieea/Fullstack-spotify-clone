"use client"

import React from 'react'
import { Song } from '../../../../../types'
import { ArrowLeftIcon } from 'lucide-react'
import DailyMixCard from '@/components/Song'
import MusicComponent from '@/components/MusicComponent'
import useOnplay from '@/hooks/useOnPlay'
import { useRouter } from 'next/navigation'
interface MusicsProps {
    songs: Song[]
}
const Musics: React.FC<MusicsProps> = (
    {
        songs
    }
) => {
    const router = useRouter()
    const handlePlay = useOnplay(songs);
    return (
        <>
            <div className='px-3 py-5 mt-3 bg-gradient-to-b from-pink-600 to-neutral-900'>
                <div className='flex flex-col gap-y-2.5'>
                    <ArrowLeftIcon className='text-white font-semibold'onClick={() => router.back()}/>
                    <h1 className='text-white font-semibold text-3xl'>Musics</h1>
                </div>
            </div>
            <div>
                {/* content */}

               <div className='grid grid-cols-2 px-3 place-content-center mb-35'>
               {
                    songs.map((song) => (
                        <div key={song.id}>
                            <DailyMixCard>
                                <MusicComponent
                                    song={song}
                                    handlePlay={(id: string) => handlePlay(id)}
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
