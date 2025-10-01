import React from 'react'
import { Song } from '../../../../types'
import MediaItem from '@/components/MediaItem'
interface AccountPageProps {
    songs: Song[]
}

const AccountPage: React.FC<AccountPageProps> = (
    {
        songs
    }
) => {
    return (
        <>
            {
                songs.map((song) => (
                    <MediaItem data={ song } key={song.id}/>
                ))
            }
        </>
    )
}

export default AccountPage
