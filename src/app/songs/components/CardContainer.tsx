"use client"

import React from 'react'
import { Song, UserDetails } from '../../../../types'
import useOnplay from '@/hooks/useOnPlay'
import SongCard from './SongCard'
import { useUsers } from '@/hooks/useUsers'


interface CardContainerProps {
    songs: Song[]
    userData : UserDetails | null
}
const CardContainer: React.FC<CardContainerProps> = (
    {
        songs, 
        userData
    }
) => {
    const onHandlePlay = useOnplay(songs);
    const { user } = useUsers();
    const userName = userData?.full_name;
    return (
        <>
            {
                user && (
                    <div className="flex flex-col gap-y-3 p-3 mt-7">
                        <h1 className='text-white font-bold text-4xl px-5'>Design For { userName }</h1>
                        <div className='grid grid-cols-1 md:grid-cols-8 p-3'>
                            {
                                songs.map((song) => (
                                    <SongCard key={song.id} song={song} onHandlePlay={(id: string) => onHandlePlay(id)} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default CardContainer
