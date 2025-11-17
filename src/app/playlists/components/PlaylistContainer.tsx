"use client"
import { useUsers } from '@/hooks/useUsers'
import React from 'react'
import { Playlist, UserDetails } from '../../../../types'
import PlaylistCard from './PlaylistCard'
import Container from '@/providers/Container'

interface PlaylistContainerProps {
    userData : UserDetails | null
    playlists: Playlist[]
}

const PlaylistContainer = ({ userData, playlists }: PlaylistContainerProps) => {
    const { user } = useUsers();
    const userName = userData?.full_name
    return (
        <>
         {
            user && (
                <Container userName={userName ?? null}>
                        {
                            playlists.map((playlist) => (
                                <PlaylistCard key={playlist.id} playlist={playlist} />
                            ))
                        }
                    </Container>
            )
         }
        </>
    )
}

export default PlaylistContainer
