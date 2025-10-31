import useCreatePlaylistModal from '@/hooks/useCreatePlaylistModal'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';
import uniqid from 'uniqid'
import { UpdateModalContainer } from './UpdateModalContainer';
import sound from '../../public/assets/sound-waves.png'
import {
    SubmitHandler,
    useForm,
    FieldValues
} from 'react-hook-form'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import { useUsers } from '@/hooks/useUsers';
import { useRouter } from 'next/navigation';


const UploadPlaylistModal = () => {
    const { onClose, isOpen } = useCreatePlaylistModal();
    const supabaseClient = useSupabaseClient()
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUsers()
    const [previewImg, setPreviewImg] = useState<string | null>(null);
    const router = useRouter();

    const handleOpenModal = (isOpen: boolean) => {
        if (!isOpen) {
            onClose();
        }
    }

    // form logic
    const {
        watch,
        handleSubmit,
        register,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            playlist_name: null,
            playlist_image: null,
            description: ""
        }
    });

    const previewImage = watch('playlist_image');

    useEffect(() => {
        if (previewImage && previewImage.length > 0) {
            const file = previewImage[0];
            const newPreview = URL.createObjectURL(file);
            setPreviewImg(newPreview);
            return () => URL.revokeObjectURL(newPreview)
        } else {
            setPreviewImg(null)
        }
    }, [previewImage])


    const handleSubmitForm: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const playlistFile = values.playlist_image?.[0];
            const uniqueID = uniqid();

            const {
                data: uploadImg,
                error: uploadError
            } = await supabaseClient.storage.from('playlists')
                .upload(`playlistImage-${values.playlist_name}-${uniqueID}`, playlistFile, {
                    upsert: false,
                    cacheControl: '3500'
                })

            if (uploadError) {
                toast.error('upload error' + uploadError.message)
            }

            // fetch playlist table
            const { error: fetchError } = await supabaseClient.from('playlist')
                .insert({
                    user_id: user?.id,
                    playlist_name: values.playlist_name,
                    playlist_image: uploadImg?.path,
                    description : values.description
                })

            if (fetchError) {
                toast.error('failed insert new data' + fetchError.message);
            }
            reset();
            toast.success('playlist created')
            router.refresh();
            setIsLoading(false)
            onClose()
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log(e.message)
            }
        }
    }

    return (
        <UpdateModalContainer
            title='Create Playlist'
            description=''
            isOpen={isOpen}
            onChange={handleOpenModal}
        >
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className='
                flex
                flex-col
                md:flex-row
                gap-y-4
                md:gap-x-4
                mt-4
            '>
                    {/* Image and Overlay Container */}
                    <div className="
                    relative
                    w-full
                    h-[200px]
                    md:w-[200px]
                    md:h-[200px]
                    group
                ">
                        {
                            previewImg ? (
                                <Image
                                    src={previewImg}
                                    alt='playlistImg'
                                    fill
                                    className='object-cover rounded-md '
                                />
                            ) : (
                                <Image
                                    src={sound}
                                    alt='playlistImg'
                                    fill
                                    className='object-cover rounded-md bg-neutral-400'
                                />
                            )
                        }
                        {/* Overlay for changing avatar */}
                        <label
                            htmlFor="playlistImg"
                            className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            bg-black/50
                            opacity-0
                            group-hover:opacity-100
                            transition-opacity
                            cursor-pointer
                            text-white
                            text-sm
                            rounded-md
                        "
                        >
                            Choose Photo
                        </label>
                        <Input
                            id="playlistImg"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={isLoading}
                            {...register('playlist_image', { required: false })}
                        />
                    </div>

                    {/* Form Inputs */}
                    <div className="flex-1 space-y-4">
                        {/* Playlist Name Input */}
                        <div>
                            <Input
                                type="text"
                                disabled={isLoading}
                                {...register('playlist_name', { required: false })}
                                id="playlist-name"
                                className="
                                bg-neutral-700
                                rounded-md
                                border
                                border-transparent
                                p-3
                                text-white
                                placeholder-gray-500
                                focus:border-neutral-400
                                focus:outline-none
                                w-full
                                py-5
                            "
                                placeholder="My Playlist"
                            />
                        </div>

                        {/* Description Input */}
                        <div>
                            <textarea
                                id="description"
                                rows={5}
                                className="
                                rounded-sm
                                w-full
                                border
                                border-transparent
                                bg-neutral-700
                                p-3
                                text-white
                                placeholder-gray-500
                                focus:border-neutral-400
                                focus:outline-none
                            "
                                placeholder="Give your playlist a description"
                                {...register('description', { required: false })}
                            />
                        </div>

                        {/* Submit Button Container */}
                        <div className='flex justify-end'>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="
                                    bg-white
                                    text-black
                                    rounded-full
                                    w-full
                                    md:w-2/4
                                    py-2
                                    font-bold
                                    hover:bg-neutral-200
                                    transition
                                "
                            >
                                {isLoading ? 'Updating...' : 'Update Playlist'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </UpdateModalContainer>
    )
}

export default UploadPlaylistModal
