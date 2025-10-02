"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { GoPlus } from 'react-icons/go'
import { twMerge } from 'tailwind-merge'
import { PiMusicNotesPlusDuotone } from "react-icons/pi";
import { RxFilePlus } from 'react-icons/rx'
import useUploadSongModal from '@/hooks/useUploadSongModal'
import useCreatePlaylistModal from '@/hooks/useCreatePlaylistModal'
import { useUsers } from '@/hooks/useUsers'
import useAuthModal from '@/hooks/useAuthModal'


const UploadMenu = () => {
    const { onOpen } = useUploadSongModal();
    const playlist = useCreatePlaylistModal();
    const { user } = useUsers()
    const authModal = useAuthModal()

    const handleOpenModal = () => {
        if(!user) {
            return authModal.onOpen()
        }else {
            return playlist.onOpen()
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="default"
                    className={twMerge(
                        `rounded-4xl
     bg-neutral-800 
     py-2 px-4
     hover:scale-106 transition
     gap-x-1
     flex  items-center justify-center`
                    )}
                // onClick={handleOpenModal}
                >
                    <GoPlus size={30} className='text-neutral-400 hover:text-neutral-400 transition' />
                    <p className='text-xs text-white font-semibold'>Create</p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-66 bg-neutral-900 " align="start" >
                <DropdownMenuItem onClick={onOpen}
                className='flex gap-x-3 items-center'>
                    <RxFilePlus  className='text-white ' size={25}/>
                    Upload Song</DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleOpenModal}
                className='flex gap-x-3 items-center'>
                <PiMusicNotesPlusDuotone  className='text-white ' size={25} />
                Create Playlist
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UploadMenu
