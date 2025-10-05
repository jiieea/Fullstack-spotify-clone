"use client"

import uniqid from 'uniqid'
import React, { useEffect, useState } from 'react'
import { UpdateModalContainer } from './UpdateModalContainer'
import Button from './Button'
import Image from 'next/image'
import { Input } from './ui/input'
import {
    SubmitHandler
    , FieldValues,
    useForm
} from 'react-hook-form'
import useUpdateProfile from '@/hooks/useUpdateProfile'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUsers } from '@/hooks/useUsers'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ModalProvidersProps } from '@/app/interfaces/types'
import useLoadAvatar from '@/hooks/useLoadAvatar'

const UpdateModal: React.FC<ModalProvidersProps> = (
    {
        userData
    }
) => {
    const [isLoading, setIsLoading] = useState(false);
    const supabaseClient = useSupabaseClient()
    const { onClose, isOpen } = useUpdateProfile()
    const { user } = useUsers();
    const router = useRouter();
    
    // Get the initial avatar URL, this will be the currently stored image
    const initialAvatarUrl = useLoadAvatar(userData!);

    // Handle form with react-hook-form
    const {
        watch,
        handleSubmit,
        reset,
        register,
        setValue
    } = useForm<FieldValues>({
        // Set a default value that can be reset later
        defaultValues: {
            full_name: '',
            avatar_url: null,
        }
    })

    // Use a state for the image preview, separate from the form's watch
    const [previewImg, setPreviewImg] = useState<string | null>(initialAvatarUrl || null);

    // Watch the form's avatar_url field for changes
    const newImageFile = watch('avatar_url');

    // This useEffect will reset the form values when userData becomes available
    useEffect(() => {
        if (userData) {
            // Use setValue to programmatically update the form fields
            setValue('full_name', userData.full_name, { shouldDirty: true });
        }
    }, [userData, setValue]);

    // This useEffect handles the image preview logic
    useEffect(() => {
        if (newImageFile && newImageFile.length > 0) {
            const file = newImageFile[0];
            const previewUrl = URL.createObjectURL(file);
            setPreviewImg(previewUrl);
            // Clean up the object URL to free up memory
            return () => URL.revokeObjectURL(previewUrl);
        } else {
            // If no new image is selected, show the existing avatar
            setPreviewImg(initialAvatarUrl);
        }
    }, [newImageFile, initialAvatarUrl]);

    const handleSubmitForm: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            // Handle image upload logic
            let avatarPath = initialAvatarUrl;
            const newAvatarFile = values.avatar_url?.[0];

            if (newAvatarFile) {
                const uniqueID = uniqid()
                const { data: profileData, error: updateError } = await supabaseClient.storage
                    .from('avatar')
                    .upload(`avatar-${user?.id}-${uniqueID}`, newAvatarFile, {
                        upsert: true,
                        cacheControl: '3500'
                    })

                if (updateError) {
                    setIsLoading(false);
                    return toast.error(updateError.message);
                }
                avatarPath = profileData.path;
            }

            // Update user table
            const { error: fetchError } = await supabaseClient.from('users')
                .update({
                    full_name: values.full_name,
                    avatar_url: avatarPath
                }).eq('id', user?.id);

            if (fetchError) {
                setIsLoading(false);
                return toast.error('Failed to update your profile');
            }

            router.refresh();
            reset();
            toast.success('Profile updated');

        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message);
            }
        } finally {
            setIsLoading(false);
            onClose(); // Close the modal on successful submission
        }
    }

    return (
        <UpdateModalContainer
            title='Profile Information'
            description=''
            isOpen={isOpen}
            onChange={onClose} // Simplified by directly using onClose
        >
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="flex items-center gap-x-6">
                    {/* Avatar Section */}
                    <div className="relative w-44 h-44 rounded-full overflow-hidden bg-neutral-700 flex-shrink-0">
                        {previewImg && (
                            <Image
                                src={previewImg}
                                alt='User Avatar'
                                fill
                                className='object-cover rounded-md'
                            />
                        )}
                        {!previewImg && (
                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-white text-sm">
                                No Image
                            </div>
                        )}
                        {/* Overlay for changing avatar */}
                        <label
                            htmlFor="image"
                            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white text-sm font-semibold"
                        >
                            Choose Photo
                        </label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={isLoading}
                            {...register('avatar_url', { required: false })}
                        />
                    </div>

                    {/* Username and Button Section */}
                    <div className="flex flex-col flex-grow">
                        <label htmlFor="fullName" className="text-white text-xs font-semibold mb-1">
                            Username
                        </label>
                        <Input
                            disabled={isLoading}
                            id="fullName"
                            placeholder="Enter your username"
                            className="
                                bg-[#282828]
                                border-neutral-700
                                text-white
                                placeholder-neutral-400
                                focus:ring-white
                                focus:border-white
                                p-3 rounded-md
                            "
                            {...register('full_name', { required: false })}
                        />
                        <div className="flex justify-end">
                            <Button
                                disabled={isLoading}
                                type="submit"
                                className="
                                    bg-white
                                    text-black
                                    rounded-full
                                    w-2/4
                                    mt-4
                                    py-2
                                    font-bold
                                    hover:bg-neutral-200
                                    transition
                                "
                            >
                                Update Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </UpdateModalContainer>
    )
}

export default UpdateModal;