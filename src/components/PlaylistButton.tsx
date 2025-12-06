"use client"
import { PlaylistButtonProps } from '@/app/interfaces/types'
import useAuthModal from '@/hooks/useAuthModal'
import { useUsers } from '@/hooks/useUsers'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { GoPlusCircle } from 'react-icons/go'
import { addSongToPlaylist } from '../../utils/addSongToPlaylist'
const PlaylistButton = ({ songId  , playlists} : PlaylistButtonProps) => {
    const router = useRouter();
    const { onOpen } = useAuthModal();
    const supabaseClient = useSupabaseClient();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user } = useUsers()

    const handleToggleDropdown = () => {
        if (!user) {
            return onOpen()
        }

        setIsDropdownOpen(!isDropdownOpen)
    }

const handleAddToSpecificPlaylist = (playlistId : string) => {
    addSongToPlaylist(supabaseClient , songId,playlistId, () => router.refresh())
}

    return (
        <div className="relative ">
            <button
                type='button'
                title='add to playlist'
                onClick={handleToggleDropdown}
                className='cursor-pointer opacity-75 transition hidden lg:block'>
                <GoPlusCircle
                    className='hover:scale-110'
                    color="white"
                    size={20}
                />
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-48 bg-neutral-800 rounded-md shadow-lg z-10">
                    <div className="py-1">
                        {playlists && playlists.length > 0 ? (
                            playlists.map((playlist) => (
                                <button
                                    title='add to playlist'
                                    key={playlist.id}
                                    onClick={() => handleAddToSpecificPlaylist(playlist.id)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-neutral-700"
                                >
                                    {playlist.playlist_name}
                                </button>
                            ))
                        ) : (
                            <span className="block px-4 py-2 text-sm text-gray-400">
                                No playlists found.
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlaylistButton
