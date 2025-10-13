import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { SidebarItemsProps } from '../../src/app/interfaces/types'
import {  useLoadPlaylistImage } from '@/hooks/useLoadImage'
import { FaPlay } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const SidebarItems: React.FC<SidebarItemsProps> = ({
  data,
  isSidebarOpen,
  userData
}) => {
  const playlistName = data.playlist_name;
  const image = useLoadPlaylistImage(data)
  const userName = userData?.full_name;
  const router = useRouter();

  const handleClickPlaylist = () => {
    router.push(`/playlist/${data.id}`)
  }

  return (
    <>
      <div
        className="
          flex 
          items-center 
          gap-x-3 
          cursor-pointer 
          w-full 
          p-3 
          rounded-md
          hover:bg-neutral-800 transition
        "
        onClick={handleClickPlaylist}
      >
        <div className="relative min-h-[49px] min-w-[49px] rounded-md overflow-hidden group"> {/* Added group class */}
          <Image
            alt="song image"
            src={image || "/images/liked.png"}
            fill
            className="object-cover transition-all duration-300 group-hover:brightness-50" // Adjusted brightness and transition
          />
          <div
            className="
              absolute 
              inset-0 
              flex 
              items-center 
              justify-center 
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            " // Fade in play button on hover
          >
            <FaPlay className="text-white text-2xl" /> {/* Increased icon size */}
          </div>
        </div>
        <div  className='flex flex-1 flex-col '>
          <span className={twMerge(
            `ml-4 text-lg transition-all 
                duration-300 overflow-hidden text-neutral-400 font-semibold 
                whitespace-nowrap w-0 opacity-0`
            , isSidebarOpen && "w-full opacity-100 max-w-[150px] truncate text-[16px]"
          )}>{playlistName}</span>
          <span className={
            twMerge(
              `ml-4 text-[12px] transition-all text-neutral-400 font-semibold
  duration-300 overflow-hidden 
  whitespace-nowrap w-0 
  opacity-0` , isSidebarOpen && "w-auto opacity-100"
            )}>Playlist &bull;{ userName }</span>
        </div>
      </div>
    </>
  )
}

export default SidebarItems





