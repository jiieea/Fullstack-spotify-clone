"use client"
import { PlaylistOptionProps } from '@/app/interfaces/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import UpdateButtonModal from './UpdatePlaylistTrigger';
import { AiOutlineMinusCircle } from "react-icons/ai";
import { twMerge } from 'tailwind-merge';
import deletePlaylist from '../../../../../utils/deletePlaylist';

export const PlaylistOption:React.FC<PlaylistOptionProps> = (
    {
        playlistData,
        disabled
    }
) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    
    const handleOpenDropdown = () => {
        setOpenDropdown(!openDropdown);
    }

    const playlistId = playlistData.id

    // handle delete playlist
    const handleDeletePlaylist = () => {
        deletePlaylist(playlistId,supabaseClient , () =>router.push('/'))
    }

    return (
        <div className='relative inline-block text-left z-50'>
            <div

                onClick={handleOpenDropdown}
                className={twMerge(
                    `text-neutral-600 hover:text-neutral-200 cursor-pointer transition` , disabled && "cursor-not-allowed"
                )}>
                <BsThreeDots
                    size={25}
                    className='text-neutral-700 hover:text-neutral-500 
               transition hover:scale-110'/>

            </div>
            {
                openDropdown && (
                    <div
                        className='absolute left-0 mt-2 w-48 rounded-md shadow-lg 
                    bg-neutral-800 ring-1 ring-black ring-opacity-5 z-10' // neutral-800 background
                    >
                        <div className={twMerge(
                            `p-1`
                        )}>
                            <button 
                            onClick={handleDeletePlaylist}
                                className={twMerge(
                                    `flex items-center gap-x-2 w-full text-left px-4 py-2 text-sm transition` 
                                )}
                            >
                            <AiOutlineMinusCircle  size={15} className='text-neutral-400'/>
                            <p className='text-white font-semibold text-[15px]'>Delete Playlist</p>
                            </button>
                          <UpdateButtonModal 
                            playlistData={ playlistData }
                            disabled={  disabled }
                          />
                        </div>
                    </div>
                )
            }
        </div>
    )
}
