"use client"

import { useUsers } from '@/hooks/useUsers';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation'
import {
    useForm,
    SubmitHandler
    , FieldValues
} from 'react-hook-form'
import { Playlist } from '../../types';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';


interface UpdatePlaylistFormProps {
    playlistData: Playlist
}



const UpdatePlaylistForm = ({ playlistData }: UpdatePlaylistFormProps) => {
    const [ isOpen , setIsOpen ] = useState(false);
    const router = useRouter();
    const { user } = useUsers();
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
            playlist_image: playlistData.playlist_image || null,
            playlist_name: playlistData.playlist_name || ""
        }
    })
    return (
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
            <div className="w-36 h-36 bg-neutral-700/50 rounded-lg flex items-center justify-center cursor-pointer mb-4 md:mb-0 hover:opacity-80 transition duration-150 relative overflow-hidden group flex-shrink-0">
              {/* This placeholder uses a dark gray background to represent the default image look */}
              <span className="text-xs text-neutral-300">Playlist Image</span>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <span className="text-white text-sm font-semibold">CHOOSE PHOTO</span>
              </div>
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
                  defaultValue="Dark Deep Sad Melancholic"
                />
              </div>

              {/* Description Textarea */}
              <div>
                <textarea
                  id="description"
                    rows={3}
                  placeholder="Ajoutez une description facultative"
                  className="w-full bg-neutral-800 text-white border-0 focus:ring-2 focus:ring-white p-3 rounded-md placeholder-neutral-400 resize-none transition"
                  defaultValue="Ajoutez une description facultative"
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
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default UpdatePlaylistForm
