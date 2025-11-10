import Image from 'next/image';
import React from 'react'
import { Playlist } from '../../types';
import useDailyPlaylist from '@/hooks/useDailyPlaylist';
import { useLoadPlaylistImage } from '@/hooks/useLoadImage';
import { MoreHorizontal, Play } from 'lucide-react';
interface HeroSectionProps {
    playlists : Playlist[]
}

const HeroSection = ({ playlists } : HeroSectionProps ) => {
    console.log(useDailyPlaylist(playlists))
  return (
    <div className="md:flex bg-gradient-to-b from-[#1E5033] to-neutral-900 p-8 space-x-6 min-h-[300px] hidden ">
    {/* Left: Playlist Cover */}
    <div className="w-52 h-52 flex-shrink-0 shadow-2xl">
        <Image 
            src={ '/assets/liked.png'}
            alt="Playlist Cover" 
            width={208}
            height={208}
            className="w-full h-full object-cover rounded shadow-xl"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/208x208/1db954/000000?text=FYP" }}
        />
    </div>

    {/* Right: Info and Buttons */}
    <div className="flex flex-col justify-end">
        <p className="text-sm font-bold text-white uppercase mb-2">Playlist</p>
        <h1 className="text-2xl lg:text-7xl  md:text-5xl font-black  text-white mb-6 leading-tight">Your Playlist of The Day</h1>
        <p className="text-gray-300 text-sm mb-6">Pour your FYP! Lagu-lagu terbaik dan terbaru only pour your playlist!</p>
        <div className="flex items-center space-x-4">
            <button className="bg-green-500 p-4 rounded-full hover:scale-105 transition-transform duration-150 shadow-2xl">
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
