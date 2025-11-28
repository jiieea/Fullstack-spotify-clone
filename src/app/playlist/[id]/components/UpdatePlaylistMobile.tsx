import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import UpdatePlaylistForm from '@/components/UpdatePlaylistForm';
import { RxPencil1 } from 'react-icons/rx';
import { Playlist } from '../../../../../types';
import Button from '@/components/Button';

interface UpdatePlaylistMobileProps {
    playlist: Playlist;
}
const UpdatePlaylistMobile = ({
    playlist
} : UpdatePlaylistMobileProps) => {
  return (
    <div>
      <div>
            <Dialog >
                <DialogTrigger asChild>
                <Button
                    className='bg-neutral-800 text-white
                 px-2 py-2 flex items-center gap-x-2 w-[100px]'>
                    <div className='flex items-center  gap-x-2 px-3'>
                        <RxPencil1 size={15} /><span className='text-center'>Update</span>
                    </div>
                </Button>
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
                        playlistData={playlist}
                    />
                </DialogContent>
            </Dialog>
        </div>
    </div>
  )
}

export default UpdatePlaylistMobile
