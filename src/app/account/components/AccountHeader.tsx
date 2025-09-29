"use client"

import { AccountHeaderProps } from '@/app/interfaces/types'
import {useGetDominantColor} from '@/hooks/useGetDominantColor'
import useLoadAvatar from '@/hooks/useLoadAvatar'
import useUpdateProfile from '@/hooks/useUpdateProfile'
import Image from 'next/image'
import React from 'react'
import { RxPencil1 } from 'react-icons/rx'

const AccountHeader:React.FC<AccountHeaderProps> = (
    {
        data
    }
) => {
    const loadAvatar = useLoadAvatar(data!)
    const { onOpen } = useUpdateProfile()
    // The bgColor is calculated but not used in the provided JSX, so I'll keep it as is.
    const bgColor = useGetDominantColor(data?.avatar_url) 
    
  return (
    <div className='mt-3 p-4 sm:p-6 lg:p-8'> {/* Adjusted padding for different screen sizes */}
      {/* Header Text - Already Responsive */}
      <h1 className='text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-6'>
        Account Settings
      </h1>
      
      <div className="flex flex-col md:flex-row gap-y-6 md:gap-y-0 gap-x-6 items-center md:items-start"> {/* Increased vertical gap on mobile */}
        
        {/* Image and Overlay Container - Sizes are already responsive */}
        <div
          onClick={onOpen}
          className='
            relative
            group
            cursor-pointer
            rounded-full
            w-32 h-32 /* Small (mobile) */
            sm:w-40 sm:h-40 /* Added sm size for a better transition */
            md:w-48 md:h-48 /* Medium */
            lg:w-56 lg:h-56 /* Large */
            overflow-hidden
            flex-shrink-0
          '
        >
          {/* Avatar Image */}
          <Image
            alt="avatar"
            src={loadAvatar || "/assets/user.png"}
            // It's good practice to set width/height based on the largest possible container size
            width={224} 
            height={224}
            className="
              object-cover
              rounded-full
              w-full h-full
              transition-transform
              group-hover:scale-105
            "
          />
          {/* Overlay for Hover Effect */}
          <div
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              bg-black/50
              rounded-full
              transition-opacity
              duration-300
              opacity-0
              group-hover:opacity-100
            "
          >
            {/* Pencil Icon - Adjusted size to be responsive (optional) */}
            <RxPencil1 className='text-white mb-2' size={24}  />
            <p className='
              font-semibold
              text-sm
              md:text-base
              lg:text-lg
              text-white
              text-center
              px-2
            '>
              Select Picture
            </p>
          </div>
        </div>

        {/* User Name Section */}
        {/* Adjusted vertical alignment on small screens and positioning on medium screens */}
        <div className="flex flex-col justify-center items-center md:items-start mt-4 md:mt-10"> 
          <p className='text-neutral-400 font-semibold text-sm'>Profile</p>
          <p
          onClick={onOpen}
          className='text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center md:text-left'>
            {data?.full_name || "User Name"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AccountHeader