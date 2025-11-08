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
import { MobileNavbar } from './MobileNavbar';
import usePlayerSong from '@/hooks/usePlayer';
import Header from './Header';
export const Sidebar: React.FC<SidebarProps> = (
    {
        icon: Icon,
        children,
        userData,
        playlists,
        likedSongs,
        songs
    }
) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { onOpen } = useUploadSongModal();
    const { user } = useUsers()
    const authModal = useAuthModal();
    const player = usePlayerSong()

    const handleOpenModal = () => {
        // if user not login  , open auth modal
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
        <div>
            <div className={twMerge(
                `flex h-[90vh] w-full bg-black  text-white`,
                player.activeId && "md:h-[calc(100vh-140px)] mb-10 md:mb-0 "
            )}>
                {/* Sidebar container */}
                <div
                    className={twMerge(`
                    bg-neutral-900 
                    transition-all 
                    duration-300 
                    hidden 
                    md:flex flex-col 
                    rounded-r-2xl 
                    shadow-xl 
                    p-2                 
                    ${isSidebarOpen ? 'w-74' : 'w-20'} 
                `)}
                >
                    {/* Sidebar Header */}
                    <div className="flex px-3 items-start justify-start rounded-t-xl mb-2"> {/* Adjusted container padding */}
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
                            bg-neutral-900 
                            w-[35px] h-[35px] 
                            flex items-center justify-center` , isSidebarOpen && "hidden transition"
                                )}>
                                <GoPlus size={30} className='text-neutral-700 hover:text-neutral-400 transition' />
                            </div>
                        </div>
                        {/* Adjusted content layout */}
                        <div className="flex  gap-x-5 items-center w-full ml-4">
                            <div className={`text-xl font-bold transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                                Library
                            </div>
                            <UploadMenu isSidebarOpen={isSidebarOpen} />
                        </div>
                    </div>

                    {/* Sidebar Navigation */}
                    <nav className="flex-1 "> {/* Removed p-2, using p-2 on outer div */}
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

                {/* 2. ADDED: pl-4 to create the necessary gap from the sidebar */}
                {/* Main content area */}
                <main
                    className={twMerge(`
        flex-1 
         overflow-y-auto 
        rounded-lg
        md:ml-3
        ml-0
    ` ,)} //
                >
                    <Header  data={ userData ?? undefined }
                    searchSongs={songs}
                    />
                    {children}
                </main>
                <Toaster position='top-center' expand={true} richColors />
                <div className="fixed bottom-0 w-full px-0 md:hidden">
                    <MobileNavbar />
                </div>
            </div>
        </div>

    )
}