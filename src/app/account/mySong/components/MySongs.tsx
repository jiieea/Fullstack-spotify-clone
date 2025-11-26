"use client"

import React from 'react'
import { Playlist, Song } from '../../../../../types'
import useOnplay from '@/hooks/useOnPlay'
import OwnedSongs from './OwnedSongs'
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
    const handlePlay = useOnplay(songs);
    return (
        <div className='mb-6'>
            {
                songs.map((song, index) => (
                   <OwnedSongs 
                   key={index}
                   data={song
                   }
                   index={ index }
                   userPlaylists={ playlists }
                   onHandlePlay={(id : string) => handlePlay(id)}

                   />
                ))
            }
        </div>
    )
}

export default MySongs
