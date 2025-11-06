"use client"

import Image from 'next/image'
import React from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaPlay } from 'react-icons/fa'
import { Playlist, Song } from '../../types'
import { toast } from 'sonner'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useLoadImage } from '@/hooks/useLoadImage'

interface SongContainerProps {
    song: Song
    playlistData: Playlist
}
export const SongContainer: React.FC<SongContainerProps> = (
    {
        song,
        playlistData
    }
) => {
    const router = useRouter()
    const { id } = playlistData;
    const loadImage = useLoadImage(song)
    const supabase = useSupabaseClient()


    const handleAddSong = async (playlistId: string) => {
        try {
            const { data: exsistingData, error: errorData } = await supabase.from('playlist_songs')
                .select('playlist_id')
                .eq('playlist_id', playlistId)
                .eq('song_id', song.id)
                .maybeSingle()

            if (errorData) {
                toast.error(errorData.message)
                return;
            }

            if (exsistingData) {
                toast.error('the song is already in the playlist')
                return;
            }


        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message)
            }
        }


        const { error: insertError } = await supabase.from('playlist_songs')
            .insert({
                song_id: song.id,
                playlist_id: playlistId
            })

        if (insertError) {
            toast.error(insertError.message)
        } else {
            router.refresh()
            toast.success('songs added to playlsit')
        }
    }
    return (
        <div className='flex items-center gap-x-2 w-full mb-2 '>
            <div className="relative min-h-[49px] min-w-[49px] rounded-md overflow-hidden group"> {/* Added group class */}
                <Image
                    alt="song image"
                    src={loadImage || "/images/liked.png"}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-50" // Adjusted brightness and transition
                />
                <div
                    className="
                                              absolute 
                                              inset-0 
                                              flex 
                                              items-center 
                                              justify-center 
                                              opacity-100
                                            " // Fade in play button on hover
                >
                    <FaPlay className="text-white text-2xl" /> {/* Increased icon size */}
                </div>
            </div>
            <div className='flex flex-col'>
                <p className='text-white font-semibold text-[15px]'>{song.title}</p>
                <p className='text-neutral-500  text-[14px]'>{song.author}</p>
            </div>
            <div className='ml-auto'>
                <CiCirclePlus className='text-white' size={25} onClick={() => handleAddSong(id)} />
            </div>
        </div>
    )
}