"use client"
import React, { useState } from 'react'

export const PlaylistOption = () => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleOpenDropdown = () => {
        setOpenDropdown(!openDropdown);
    }


    return (
        <div className='relative inline-block text-left z-50'>
            <div
                onClick={handleOpenDropdown}
                className='flex gap-x-2 items-center
         text-neutral-600 hover:text-neutral-200 cursor-pointer transition'>
                {
                    openDropdown && (
                        <div
                            className='absolute right-0 mt-2 w-48 rounded-md shadow-lg 
                    bg-neutral-800 ring-1 ring-black ring-opacity-5 z-10' // neutral-800 background
                        >
                            <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                                <button // Use a <button> instead of <a> when no external link is involved
                                    // Attach the click handler
                                    className="block w-full text-left px-4 py-2 text-sm transition"

                                >
                                    Delete Playlists
                                </button>

                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
