"use client"
import { PlaylistButtonProps } from '@/app/interfaces/types'
import useAuthModal from '@/hooks/useAuthModal'
import { useUsers } from '@/hooks/useUsers'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { GoPlusCircle } from 'react-icons/go'
import { toast } from 'sonner'
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

    const handleAddToSpecificPlaylist = async (playlistId: string) => {
        setIsDropdownOpen(false)
        try {
            const { data: existingEntry,
                error: fetchError
            } = await supabaseClient.from('playlist_songs')
            .select('playlist_id').eq('playlist_id' , playlistId).eq('song_id' , songId).maybeSingle();

            if(fetchError) {
                toast.error(fetchError.message)
                return;
            }

            if(existingEntry) {
                toast.warning("This song already in the playlist!")
                return;
            }

            
            const { error } = await supabaseClient.from('playlist_songs')
            .insert({
                playlist_id : playlistId,
                song_id : songId
            })

            if(error) {
                toast.error(error.message)
            }else {
                toast.success('song added to playlist')
            }

            router.refresh()
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message)
            }
            return;
        }
    }

    return (
        <div className="relative mt-1">
            <button
                type='button'
                title='add to playlist'
                onClick={handleToggleDropdown}
                className='cursor-pointer opacity-75 transition'>
                <GoPlusCircle
                    className='hover:scale-110'
                    color="white"
                    size={25}
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
