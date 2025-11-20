"use client"

import React from 'react'
import { Playlist, Song } from '../../../../../types'
import MediaItem from '@/components/MediaItem'
import useOnplay from '@/hooks/useOnPlay'

interface MySongsProps {
    playlists: Playlist[],
    songs: Song[]
}

const MySongs: React.FC<MySongsProps> = (
    {
        playlists,
        songs
    }
) => {
    const handlePlay = useOnplay(songs)
    return (
        <div>
            {
                songs.map((song, index) => (
                    <MediaItem
                        data={song}
                        key={song.id}
                        isLoading
                        index={index}
                        userPlaylists={playlists}
                        onHandlePlay={(id) => handlePlay(id)}
                        onHandleRemoveSong={() => console.log(song.id)}
                    />
                ))
            }
        </div>
    )
}

export default MySongs
