"use client"

import { usePathname } from 'next/navigation';
import React, { useState, useMemo, JSX } from 'react'
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import SidebarItems from './SidebarItems';
import { GoPlus } from "react-icons/go";
import { twMerge } from 'tailwind-merge';
import { toast, Toaster } from 'sonner';
import useUploadSongModal from '@/hooks/useUploadSongModal';
import { useUsers } from '@/hooks/useUsers';
import useAuthModal from '@/hooks/useAuthModal';
interface SidebarProps {
  children: React.ReactNode
  icon: JSX.Element;
}
export const Sidebar: React.FC<SidebarProps> = (
  {
    icon: Icon,
    children
  }
) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { onOpen } = useUploadSongModal();
  const { user } = useUsers()
  const authModal = useAuthModal()

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

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: "Home",
      active: pathname !== '/search',
      href: "/"
    }, {
      icon: BiSearch,
      label: "Search",
      active: pathname === "/acount",
      href: "/account"
    }
  ], [pathname])

  return (
    <div className="flex min-h-screen bg-black text-white gap-x-4">
      {/* Sidebar container */}
      <div
        className={`bg-neutral-900 transition-all 
          duration-300 hidden md:block 
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
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
            <div className={twMerge(
              `rounded-full 
              bg-neutral-800 
              w-[25px] h-[25px] 
              flex items-center justify-center`
            )}
              onClick={handleOpenModal}
            >
              <GoPlus size={20} className='text-neutral-700 hover:text-neutral-400 transition' />
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-2 space-y-2">
          {/* Home Link */}
          {
            routes.map((route) => (
              <SidebarItems key={route.href} {...route} isSidebarOpen={isSidebarOpen} />
            ))
          }
        </nav>
      </div>

      {/* Main content area */}
      <main
        className={`p-2 flex-1  overflow-y-auto  bg-neutral-900 h-max-screen rounded-lg`}
      >
        {children}
      </main>
      <Toaster position='top-center' expand={true} richColors />
    </div>

  )
}
