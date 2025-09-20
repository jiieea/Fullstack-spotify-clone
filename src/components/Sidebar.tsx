"use client"

import { usePathname } from 'next/navigation';
import React, { useState, useMemo } from 'react'
import { BiSearch } from 'react-icons/bi';
import { HiHome } from 'react-icons/hi';
import { BiLibrary } from "react-icons/bi";
import SidebarItems from './SidebarItems';
interface SidebarProps {
  children: React.ReactNode
}
export const Sidebar: React.FC<SidebarProps> = (
  {
    children
  }
) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname()

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
      active: pathname === "/search",
      href: "/search"
    }
  ], [pathname])

  const MenuIcon = <BiLibrary size={30} />

  return (
    <div className="flex min-h-screen font-sans bg-neutral-900 text-white">
      {/* Sidebar container */}
      <div
        className={`bg-neutral-800 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-25'} 
          flex flex-col rounded-r-2xl shadow-xl`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-start p-4 rounded-t-xl">
          <button
            onClick={handleOpenSidebar}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            {MenuIcon}
          </button>
          <div className={`ml-4 text-xl font-bold transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            Library
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-2">
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
        className={`flex-1 p-8 transition-all duration-300`}
      >
        {children}
      </main>
    </div>
  )
}
