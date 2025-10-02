import React from 'react'
import MediaItem from '@/components/MediaItem'
import { AccountPageProps } from '../../interfaces/types'
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
