"use client"
import React from 'react';
import { PlayerContent } from './PlayerContent';
import { Playlist } from '../../types';
import useLoadSongUrl from '@/hooks/useLoadSongUrl';
import usePlayerSong from '@/hooks/usePlayer';
import useGetSongById from '@/hooks/useGetSongById';

interface PlayerProps {
    userPlaylist: Playlist[];
}
export const Player: React.FC<PlayerProps> = ({
    userPlaylist
}) => {
    const player = usePlayerSong();
    const { song } = useGetSongById(player.activeId);
    const songUrl = useLoadSongUrl(song!);
    if (!songUrl || !song || !player.activeId) {
        return null;
    }
    return (
        <div className='
          fixed
          bottom-[60px]
          md:bottom-0 
          w-[95%] 
          md:w-full 
          left-1/2 
          -translate-x-1/2 
          md:translate-x-0
          md:left-0
          md:rounded-none
          rounded-lg
          bg-neutral-800/80 
          md:bg-black
          z-5
          ps-1
          pr-1
        '>
            <PlayerContent
                key={songUrl}
                song={song}
                songUrl={songUrl}
                userPlaylists={userPlaylist}
            />
        </div>
    );
};