"use client"

import React from 'react'
import { UpdateModalContainer } from './UpdateModalContainer'
import useUpdatePlaylistModal from '@/hooks/useUpdateModal'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useLoadPlaylistImage } from '@/hooks/useLoadImage'
export const UpdatePlaylistModal = () => {
  const supabase = useSupabaseClient();
  const { onClose, isOpen } = useUpdatePlaylistModal();
  const router = useRouter();
  // const initialPlaylistImageUrl = useLoadPlaylistImage();
  const {
    watch,
    register,
    handleSubmit,
    reset,
    setValue
  } = useForm<FieldValues>({
    defaultValues : {
        playlist_name : '',
    playlist_image : null
    }
  })





  const handleOpenModal = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <UpdateModalContainer
      title='Update Your Playlist Information'
      description=''
      isOpen={isOpen}
      onChange={handleOpenModal}
    >
      <div>THis is update playllist modal</div>
    </UpdateModalContainer>
  )
}
