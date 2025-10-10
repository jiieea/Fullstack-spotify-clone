"use client"

import React, { useState } from 'react'

import SidebarItems from './SidebarItems';
import { GoPlus } from "react-icons/go";
import { twMerge } from 'tailwind-merge';
import { Toaster } from 'sonner';
import useUploadSongModal from '@/hooks/useUploadSongModal';
import { useUsers } from '@/hooks/useUsers';
import useAuthModal from '@/hooks/useAuthModal';
import { SidebarProps } from '../../src/app/interfaces/types'
import UploadMenu from './UploadMenu';
import LikedSongs from './LikedSongs';
export const Sidebar: React.FC<SidebarProps> = (
  {
    icon: Icon,
    children,
    userData,
    playlists,
    likedSongs
  }
) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { onOpen } = useUploadSongModal();
  const { user } = useUsers()
  const authModal = useAuthModal();

  const handleOpenModal = () => {
    // if user not login  , open auth modal
    if (!user) {
      return authModal.onOpen()
    } else {
      return onOpen()
    }
  }


  const handleOpenSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }


  return (
    <div className="flex h-full bg-black text-white gap-x-4">
      {/* Sidebar container */}
      <div
        className={`bg-neutral-900 transition-all 
          duration-300 hidden md:block 
          ${isSidebarOpen ? 'w-74' : 'w-20'} 
        flex flex-col rounded-r-2xl shadow-xl `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-start p-4 rounded-t-xl">
          <div className='flex flex-col gap-y-2 items-center'>
            <button
              title='open'
              onClick={handleOpenSidebar}
              className="p-2 rounded-full hover:bg-neutral-800 transition-colors"
            >
              {Icon}
            </button>
            <div
              onClick={handleOpenModal}
              className={twMerge(
                `rounded-full 
              bg-neutral-800 
              w-[35px] h-[35px] 
              flex items-center justify-center` , isSidebarOpen && "hidden transition"
              )}>
              <GoPlus size={30} className='text-neutral-700 hover:text-neutral-400 transition' />
            </div>
          </div>
          <div className="flex gap-x-4 items-center justify-evenly w-full">
            <div className={`ml-4 text-xl font-bold transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              Library
            </div>
            <UploadMenu isSidebarOpen={isSidebarOpen} />
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-2 ">
          {/* Home Link */}
          {user && <LikedSongs
            likedSongs={likedSongs}
            href='/liked'
            icon='/assets/liked.png'
            isSidebarOpen={isSidebarOpen}
          />}
          {
            user ? (
              <div>
                {
                  playlists.map((playlist) => (
                    <SidebarItems
                      key={playlist.id}
                      data={playlist}
                      isSidebarOpen={isSidebarOpen}
                      userData={userData} />
                  ))
                }
              </div>
            ) : (
              <div className={twMerge(
                `bg-neutral-800 rounded-2xl w-full h-20 p-3 text-center text-[15px]`, !isSidebarOpen && "hidden"
              )}>
                You must login to upload a song
              </div>
            )
          }
        </nav>
      </div>

      {/* Main content area */}
      <main
        className={` flex-1  overflow-y-auto  rounded-lg`}
      >
        {children}
      </main>
      <Toaster position='top-center' expand={true} richColors />
    </div>

  )
}
