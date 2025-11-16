"use client"

import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { Playlist, Song } from '../../types';
import useDailyPlaylist from '@/hooks/useDailyPlaylist';
import { useLoadDailyPlaylist } from '@/hooks/useLoadImage';
import { MoreHorizontal, Play } from 'lucide-react';
import { useGetDominantColor } from '@/hooks/useGetDominantColor';
import useOnplay from '@/hooks/useOnPlay';
import { useRouter } from 'next/navigation';
import getPlaylistSongs from '@/app/action/getPlaylistSong';
interface HeroSectionProps {
    playlists: Playlist[]
}   

const HeroSection = ({ playlists }: HeroSectionProps) => {
    const playlistData = useDailyPlaylist(playlists);
    const router = useRouter();
    const playlistImage = useLoadDailyPlaylist(playlistData?.playlist_image ?? null)
    const bgColor = useGetDominantColor(playlistImage!);
    const [dailySongs, setDailySongs] = useState<Song[]>([]);
    const handlePlay = useOnplay(dailySongs)


    // 3. Use useEffect to fetch data when playlistId is available
    useEffect(() => {
        const fetchDailySongs = async () => {
            if (playlistData?.id) {
                // Fetch using the client-side function
                const songs = await getPlaylistSongs(playlistData.id);
                setDailySongs(songs);
            } else {
                setDailySongs([]);
            }
        };

        fetchDailySongs();
    }, [playlistData?.id]);

    const handleOpenPlaylist = () => {
        router.push(`/playlist/${playlistData?.id}`)
    }

    return (
        <div
            className="md:flex bg-gradient-to-b from-[var(--playlist-color)] 
         to-neutral-900 transition-colors duration-500 p-8 space-x-6 min-h-[300px] hidden "
            style={{ '--playlist-color': bgColor } as React.CSSProperties}>
            {/* Left: Playlist Cover */}
            <div
                onClick={handleOpenPlaylist}
                className="w-52 h-52 flex-shrink-0 shadow-2xl">
                <Image
                    src={playlistImage || "/assets/liked.png"}
                    alt="Playlist Cover"
                    width={208}
                    height={208}
                    className="w-full h-full object-cover rounded shadow-xl"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
                         { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/208x208/1db954/000000?text=FYP" }}
                />
            </div>

            {/* Right: Info and Buttons */}
            <div className="flex flex-col justify-end">
                <p className="text-sm font-bold text-white uppercase mb-2">Playlist</p>
                <h1 className="text-5xl 2xl:text-7xl   font-black  text-white mb-6 leading-tight">Your Playlist of The Day</h1>
                <p className="text-gray-300 text-sm mb-6">Discover the playlist based on your mood!</p>
                <div className="flex items-center space-x-4">
                    <button className="bg-green-500 p-4 rounded-full hover:scale-105 transition-transform duration-150 shadow-2xl"
                        onClick={() => handlePlay(dailySongs[0].id)}
                    >
                        <Play fill="black" className="w-6 h-6 text-black" />
                        <span className="sr-only">Lecture</span>
                    </button>
                    <button className="text-white border border-white hover:bg-white/10 px-4 py-2 rounded-full font-bold transition">
                        S&lsquo;abonner
                    </button>
                    <MoreHorizontal className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection
