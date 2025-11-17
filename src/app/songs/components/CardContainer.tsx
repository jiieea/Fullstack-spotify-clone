"use client"

import React from 'react'
import { Song, UserDetails } from '../../../../types'
import useOnplay from '@/hooks/useOnPlay'
import SongCard from './SongCard'
import { useUsers } from '@/hooks/useUsers'
import Container from '@/providers/Container'


interface CardContainerProps {
    songs: Song[]
    userData: UserDetails | null
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
                <Container userName={userName ?? null}>
                        {
                            songs.map((song) => (
                                <SongCard key={song.id} song={song} onHandlePlay={(id: string) => onHandlePlay(id)} />
                            ))
                        }
                    </Container>
            )
         }
        </>
    )
}

export default CardContainer
