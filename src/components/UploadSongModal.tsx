'use client'

import React, { useState } from 'react'
import ModalContainer from './ModalContainer'
import useUploadSongModal from '@/hooks/useUploadSongModal'
import { Input } from './ui/input'
import uniqid from 'uniqid'
import { Button } from './ui/button'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useUsers } from '@/hooks/useUsers'
import { toast } from 'sonner'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

const UploadSongModal = () => {
    const { onClose, isOpen } = useUploadSongModal()
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUsers()
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {
        reset,
        handleSubmit,
        register
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            author: "",
            song: null,
            image: null
        }
    })

    // event handler to submit the upload form
    const handleUploadSong: SubmitHandler<FieldValues> = async (values) => {
        // --- CHANGE 1: Set isLoading to true directly. ---
        // Using !isLoading here can cause issues if it's already true from a previous failed attempt.
        setIsLoading(true); 
        
        try {
            // --- CHANGE 2: Simplified and corrected file access/name. ---
            // 'songFIle' typo corrected to 'songFile'.
            // Ensure you are accessing the file from the FileList correctly.
            const songFile = values.song?.[0]; 
            const imageFile = values.image?.[0];
            
            // Note: use values.song?.[0] and values.image?.[0] as react-hook-form's register 
            // for file inputs puts the FileList object in the value.
            
            if (!songFile || !imageFile || !user) {
                toast.error('Missing required files or user not logged in');
                setIsLoading(false);
                return;
            }

            const uniqueID = uniqid();

            // fetch songs bucket 
            const {
                data: songData,
                error: songUploadError // Renamed 'fetchError' to 'songUploadError' for clarity
            } = await supabaseClient.storage
                .from('songs').upload(`song-${values.title}-${uniqueID}`, songFile, { // Changed songFIle to songFile
                    cacheControl: '3500',
                    upsert: false
                })

            if (songUploadError) {
                setIsLoading(false)
                return toast.error(`Song upload failed: ${songUploadError.message}`) // Added error message for better debugging
            }

            //  fetch image song bucket
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient.storage.from('images')
                .upload(`images-${values.title}-${uniqueID}`, imageFile, {
                    upsert: false,
                    cacheControl: '3500'
                })

            if (imageError) {
                // If image upload fails, you might want to delete the song file uploaded
                // to prevent orphaned files, but for simplicity, we'll just stop here.
                setIsLoading(false)
                return toast.error(`Image upload failed: ${imageError.message}`) // Added error message
            }

            //  push the data to table song
            const { error: pushError } = await supabaseClient.from('songs')
                .insert({
                    user_id: user.id, // --- CHANGE 3: Changed 'id' to 'user_id' ---
                    title: values.title,
                    author: values.author,
                    song_path: songData.path,
                    image_path: imageData.path
                })

            if (pushError) {
                setIsLoading(false);
                return toast.error(`Database insertion failed: ${pushError.message}`) // Added error message
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song Created 🎉")
            reset();
            onClose(); // Call onClose AFTER reset and toast.success for better user experience
            
        } catch (err: unknown) {
            console.error("Upload failed:", err);
            toast.error("Unexpected error occurred");
            setIsLoading(false);
        }
    }
    const handleOpenModal = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }
    return (

        <ModalContainer
            title='Upload Your Songs'
            description='Upload an MP3 file and a cover image.'
            isOpen={isOpen}
            onChange={handleOpenModal}
        >
            <form action="" onSubmit={handleSubmit(handleUploadSong)}
                // Removed encType="multipart/form-data" as react-hook-form handles file inputs.
                // Keeping it is generally fine, but it's often not strictly necessary with RHF's approach.
                className="flex flex-col space-y-4">
                <Input
                    id="title" // --- CHANGE 4: Corrected typo from 'tittle' to 'title' ---
                    type="text"
                    disabled={isLoading}
                    placeholder="Enter the title"
                    className="mt-4 py-3 px-4 rounded-md bg-neutral-700 border-transparent
                        disable:cursor-not-allowed disabled:opacity-50 focus:outline-none"
                    {...register('title', { required: true })}

                />

                <Input
                    id="author"
                    type="text"
                    disabled={isLoading}
                    placeholder="Song author"
                    className="mt-4 py-3 px-4 rounded-md bg-neutral-700 border-transparent
                        disable:cursor-not-allowed disabled:opacity-50 focus:outline-none"
                    {...register('author', { required: true })}
                />

                <div className="gap-y-2 flex flex-col">
                    <div className="mb-2">
                        Select song file (.mp3 only)
                    </div>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register('song', {
                            required: true
                        })}
                    />

                    <div className="mb-2">
                        Select song image
                    </div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*" // Corrected 'images/*' to 'image/*'
                        {...register('image', {
                            required: true
                        })}
                    />
                    <Button className="py-2 mt-2 " type="submit" disabled={isLoading}>
                        {isLoading ? 'Uploading...' : 'Create'}
                    </Button>
                </div>
            </form>
        </ModalContainer>
    )
}

export default UploadSongModal