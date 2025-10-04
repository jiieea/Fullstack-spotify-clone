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
const UpdateModal:React.FC<ModalProvidersProps> = (
    {
        userData
    }
) => {
    const [isLoading, setIsLoading] = useState(false);
    const avatar = useLoadAvatar(userData!)
    const supabaseClient = useSupabaseClient()
    const { onClose, isOpen } = useUpdateProfile()
    const { user } = useUsers();
    const [previewImg, setPreviewImg] = useState<string | null>(null)
    const router = useRouter();
    const fullName = userData?.full_name;

    const handleOpenModal = (isOpen: boolean) => {
        if (!isOpen) {
            onClose()
        }
    }

    // handle update form
    const {
        watch,
        handleSubmit,
        reset,
        register
    } = useForm<FieldValues>({
        defaultValues: {
            full_name: userData?.full_name|| "",
            avatar_url: null,
        }
    })


    const prevImage = watch('avatar_url');

    useEffect(() => {
        if(prevImage && prevImage.length > 0) {
            const file =prevImage[0];
            const previewUrl = URL.createObjectURL(file);
            setPreviewImg(prevImage);
            return () => URL.revokeObjectURL(previewUrl)
        }else {
            setPreviewImg(null);
        }
    },[prevImage])


    const handleSubmitForm: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const avatarImg = values.avatar_url?.[0];

            const uniqueID = uniqid()
            const {
                data: profileData
                , error: updateError
            } = await supabaseClient.storage
                .from('avatar')
                .upload(`avatar-${user?.id}-${uniqueID}`, avatarImg, {
                    upsert: false,
                    cacheControl: '3500'
                })

            if (updateError) {
                setIsLoading(false)
                return toast.error(updateError.message)
            }

            // fetch user  table
            const {
                error: fetchError } = await supabaseClient.from('users')
                    .update({
                        full_name: values.full_name,
                        avatar_url: profileData.path
                    }).eq('id', user?.id)

            if (fetchError) {
                return toast.error('failed update your profile')
            }

            router.refresh()
            reset();
            toast.success('profile updated')
            setIsLoading(false)
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message)
            }
        }
    }

    return (
        <UpdateModalContainer
            title='Profile Information'
            description=''
            isOpen={isOpen}
            onChange={handleOpenModal}
        >
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="flex items-center gap-x-6">
                    {/* Avatar Section */}
                    <div className="relative w-44 h-44 rounded-full overflow-hidden bg-neutral-700 flex-shrink-0">
                       {
                        previewImg ? (
                            <Image
                                src={previewImg}
                                alt='playlistImg'
                                fill
                                className='object-cover rounded-md'
                            />
                        ) : (
                            <Image
                                src={ avatar ||  '/images/liked.png'}
                                alt='playlistImg'
                                fill
                                className='object-cover rounded-md'
                            />
                        )
                    }
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
                            defaultValue={fullName}
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

export default UpdateModal