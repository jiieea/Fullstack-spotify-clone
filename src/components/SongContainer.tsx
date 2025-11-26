"use client";

import Image from 'next/image';
import React from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { FaPlay } from 'react-icons/fa';
import { Playlist, Song } from '../../types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useLoadImage } from '@/hooks/useLoadImage';
import { addSongToPlaylist } from '../../utils/addSongToPlaylist';
interface SongContainerProps {
    song: Song;
    playlistData: Playlist;
}

export const SongContainer: React.FC<SongContainerProps> = ({ song, playlistData }) => {
    const router = useRouter();
    const { id } = playlistData;
    const loadImage = useLoadImage(song);
    const supabase = useSupabaseClient();

    const handleAddSong = () => {
        addSongToPlaylist(supabase, id, song.id, () => router.refresh());
    };

    return (
        <div className="flex items-center gap-x-2 w-full mb-2">
            <div className="relative min-h-[49px] min-w-[49px] rounded-md overflow-hidden group">
                <Image
                    alt="song image"
                    src={loadImage || "/images/liked.png"}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-100">
                    <FaPlay className="text-white text-xl" />
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-white font-semibold text-[15px]">{song.title}</p>
                <p className="text-neutral-500 text-[14px]">{song.author}</p>
            </div>
            <div className="ml-auto">
                <CiCirclePlus className="text-white" size={25} onClick={handleAddSong} />
            </div>
        </div>
    );
};