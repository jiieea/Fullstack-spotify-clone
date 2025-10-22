"use client"

import { LibraryChildComponentProps } from '@/app/interfaces/types';
import React, { useState } from 'react'
import LibraryHeader from './LibraryHeader';
import LibraryContent from './LibraryContent';
const LibraryChildComponent: React.FC<LibraryChildComponentProps> = (
    {
        userData,
        userSongs,
        userPlaylists,
        liked
    }
) => {
    const [active, setActive] = useState<'songs' | 'playlists' | ' all '>(' all ');
    return (
        <div>
            {/* Content wrapper with bottom padding */}
            <div className="p-5 border-b-2 border-black drop-shadow-xs ">
                <LibraryHeader user={userData}
                    active={active}
                    setActive={setActive}
                />
            </div>

             {/* library content */}
            <LibraryContent
                userSongs={active === "songs" ? userSongs : active === ' all ' ? userSongs : []}
                likedSongs={liked}
                userPlaylists={active === 'playlists' ? userPlaylists : active === ' all ' ? userPlaylists : []}
                userData={userData!}
            />
        </div>
    )
}

export default LibraryChildComponent
