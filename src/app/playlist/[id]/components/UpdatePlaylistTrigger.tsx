"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// import { UpdatePlaylistForm } from './UpdatePlaylistForm'
import { UpdateDialogProps } from '@/app/interfaces/types'
import { RxPencil1 } from 'react-icons/rx'
import UpdatePlaylistForm from '@/components/UpdatePlaylistForm'

const UpdateButtonModal: React.FC<UpdateDialogProps> = (
    {
        playlistData,
        disabled
    }
) => {
    return (
        <div>
            <Dialog >
                <DialogTrigger asChild>
                     <button disabled={ disabled }   className="flex items-center gap-x-2 w-full text-left px-4 py-2 text-sm transition">
                        <RxPencil1 className='text-white' size={15} />
                        <p className='text-white font-semibold text-[15px]'> Update Playlist</p>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg bg-neutral-800">
                    <DialogHeader>
                        <DialogTitle className='text-white text-2xl'>Update Information </DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    {/* todo : create update playlist form , 
                                we can use form that we've created bfr */}
                    <UpdatePlaylistForm
                        playlistData={playlistData}
                    />

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateButtonModal