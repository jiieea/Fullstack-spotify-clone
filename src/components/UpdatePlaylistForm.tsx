"use client"

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation'
import uniqid from 'uniqid'
import {
  useForm,
  SubmitHandler
  , FieldValues
} from 'react-hook-form'
import { Playlist } from '../../types';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useLoadPlaylistImage } from '@/hooks/useLoadImage';
import { toast } from 'sonner';
import Image from 'next/image';


interface UpdatePlaylistFormProps {
  playlistData: Playlist
}



const UpdatePlaylistForm = ({ playlistData }: UpdatePlaylistFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const playlistImage = useLoadPlaylistImage(playlistData);
  const [previewImg, setPreviewImg] = useState<string | null>(null)
  const supabase = useSupabaseClient();

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const {
    watch,
    reset,
    handleSubmit,
    register
  } = useForm<FieldValues>({
    defaultValues: {
      playlist_image: playlistData.playlist_image,
      playlist_name: playlistData.playlist_name || "",
      description: playlistData?.description || ""
    }
  })

  const prevImg = watch('playlist_image');

  // useEffect to show the preview image
  // useEffect to show the preview image
  useEffect(() => {
    if (prevImg && prevImg.length > 0) {
      const file = prevImg[0];
      if (file instanceof File || file instanceof Blob) {
        const newPrevImg = URL.createObjectURL(file);
        setPreviewImg(newPrevImg);
        return () => URL.revokeObjectURL(newPrevImg)
      } else {
        setPreviewImg(null)
      }
    } else {
      setPreviewImg(null)
    }
  }, [prevImg])



  // update playlist function
  const handleUpdatePlaylist: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.playlist_image?.[0];
      const uniqueID = uniqid();

      // upload the image to bucket
      const { data: uploadImage,
        error: uploadError } = await supabase.storage.from('playlists')
          .upload(`playlistImage-${values.playlist_name}-${uniqueID}`, imageFile, {
            upsert: false,
            cacheControl: '3600'
          })

      if (uploadError) {
        toast.error(uploadError.message)
      }

      // upadate new data
      const {
        error: updateError
      } = await supabase.from('playlist').update({
        playlist_name: values.playlist_name,
        playlist_image: uploadImage?.path,
        description: values.description
      }).eq('id',playlistData.id)

      if (updateError) {
        toast.error("failed update new data" + updateError)
      }

      reset();
      router.refresh();
      setIsLoading(false);
      toast.success('playlist updated');
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message)
      }
    }

  }
  return (
    <form onSubmit={handleSubmit(handleUpdatePlaylist)}>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
        {/* 2. MODAL BODY: Darker background (bg-neutral-900) to match Spotify's deep charcoal */}
        <div
          className="
          relative 
          bg-neutral-900 
          pt-4 pb-6 px-4
          rounded-lg 
          shadow-2xl 
          shadow-black/70
          w-[90vw] 
          max-h-[90vh] 
          md:max-w-lg 
          z-[999] 
          flex 
          flex-col 
          text-white
          animate-in fade-in zoom-in
        "
        >

          {/* HEADER (No border at the bottom, tight padding) */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl font-bold">
              Modifier les informations
            </h2>

            {/* CLOSE BUTTON (Icon in top right, dark hover background) */}
            <button
              onClick={toggleModal}
              className="text-neutral-400 hover:text-white transition p-1 rounded-full hover:bg-neutral-800"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          {/* CONTENT / FORM - Scrollable if needed */}
          <div className="space-y-4 overflow-y-auto pr-2">

            {/* Playlist Image & Input Fields - Side-by-side on desktop */}
            <div className="flex flex-col md:flex-row items-start md:space-x-4">

              {/* Image Placeholder (Square, fixed size) */}
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
                      src={playlistImage!}
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
                <input
                  id="playlistImg"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={isLoading}
                  {...register('playlist_image', { required: false })}
                />
              </div>

              {/* Input Fields Container */}
              <div className="flex-1 space-y-4 w-full">

                {/* Name Input */}
                <div>
                  {/* Spotify inputs are very dark, almost blending with the modal body */}
                  <input
                    id="name"
                    type="text"
                    placeholder="Dark Deep Sad Melancholic"
                    className="w-full bg-neutral-800 text-white border-0 focus:ring-2 focus:ring-white p-3 rounded-md placeholder-neutral-400 transition text-lg font-semibold"
                    disabled={isLoading}
                    {...register('playlist_name', { required: true })}

                  />
                </div>

                {/* Description Textarea */}
                <div>
                  <textarea
                    id="description"
                    rows={5}
                    placeholder="Ajoutez une description facultative"
                    className="w-full bg-neutral-800 text-white border-0 focus:ring-2 focus:ring-white p-3 rounded-md placeholder-neutral-400 resize-none transition"
                    disabled={isLoading}
                    {...register('description', { required: true })}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* LEGAL TEXT (Matches the small text below the form fields in the screenshot) */}
            <p className="text-xs text-neutral-400 mt-4 leading-relaxed">
              En continuant, vous accordez à Spotify les droits de l&apos;image que vous décidez d&apos;importer. Vérifiez bien que vous avez les droits d’importer cette image.
            </p>

            {/* ACTION BUTTON (Aligned Right) */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="
                bg-white 
                text-black 
                font-bold 
                py-2 
                px-6 
                rounded-full 
                uppercase
                text-sm
                hover:scale-[1.02] 
                transition 
                duration-200 
                shadow-lg
              "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default UpdatePlaylistForm
