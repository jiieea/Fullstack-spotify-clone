"use client"
import Image from 'next/image';
import React from 'react'
import { Song } from '../../types';
import { useLoadImage } from '@/hooks/useLoadImage';
import { Play } from 'lucide-react';

interface MusicComponentProps {
    handlePlay : (id : string) => void
    song : Song
}
const MusicComponent:React.FC<MusicComponentProps> = (
    {
        handlePlay ,
        song
    }
) => {
    const imageSong = useLoadImage(song);
  return (
    <div>
        <div className="lg:w-48 w-40 flex-shrink-0 cursor-pointer group hover:bg-neutral-700 transition p-3 rounded-2xl">
                                            {/* Image/Badge Area */}
                                            <div
                                                onClick={() => handlePlay(song.id)}
                                                className={`relative w-full aspect-square bg-gradient-to-br rounded-lg shadow-lg overflow-hidden`}>
                                                {/* Placeholder Image */}
                                                <Image
                                                    src={imageSong || "https://placehold.co/192x192/181818/1db954?text=MIX"}
                                                    alt="Mix Cover"
                                                    fill
                                                    className="w-full h-full object-cover opacity-70"
                                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/192x192/181818/1db954?text=MIX" }}
                                                />
                                                {/* Badge */}
                                                {/* Play Button Overlay */}
                                                <div className="absolute right-2 bottom-2 p-3
                                                 bg-green-500 rounded-full opacity-0 
                                                group-hover:opacity-100 transition-opacity 
                                                duration-300 transform translate-y-2
                                                group-hover:translate-y-0 shadow-2xl hover:scale-105">
                                                    <Play fill="black" className="w-5 h-5 text-black" />
                                                </div>
                                            </div>
                                            {/* Text Area */}
                                            <div className="mt-3 text-white">
                                                <p className="text-sm text-white line-clamp-2
                                                 font-semibold mt-1 ">{song.title}</p>
                                            </div>
                                        </div>
    </div>
  )
}

export default MusicComponent
