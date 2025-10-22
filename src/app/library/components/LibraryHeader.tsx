"use client"
import React from 'react'
import { UserDetails } from '../../../../types'
import Image from 'next/image'
import { BiSearch } from 'react-icons/bi'
import SheetLibrary from '@/components/Sheet'
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import useLoadAvatar from '@/hooks/useLoadAvatar'

interface LibraryHeaderProps {
    user: UserDetails | null
    active: 'songs' | 'playlists' | ' all ';
    setActive: (filter: 'songs' | 'playlists' | ' all ') => void;
}
const LibraryHeader: React.FC<LibraryHeaderProps> = (
    {
        user,
        active,
        setActive
    }
) => {
    const avatar = useLoadAvatar(user!);
    const router = useRouter();
    // event handler to open dropdown
    const onClick = () => {
        router.push('/account')
    }
    return (
        <div className='flex mt-5 flex-col space-y-5'>
            <div className="flex items-center justify-between">
                {/* avatar image */}
                <div className='flex gap-x-5 items-center'>
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"> {/* New wrapper div */}
                        <Image
                            src={avatar || "/images/user.png"}
                            alt="avatar"
                            width={40}
                            onClick={onClick}
                            height={40}
                            className='object-cover w-full h-full cursor-pointer' // Ensure image fills and covers
                        />
                    </div>
                    <h1 className='text-white font-semibold text-2xl'>
                        Library
                    </h1>
                </div>

                {/* add playlist or songs icon */}
                <div className='flex gap-x-4'>
                    {/* add icons */}
                    <BiSearch className='text-white' size={25} />
                    <SheetLibrary />
                </div>
            </div>
            {/* <p className='text-white'>helo</p> */}
            <div className="flex gap-x-2.5">
                <Badge variant="secondary" onClick={() => setActive('songs')} className={twMerge(
                    `bg-neutral-800 text-white`, active === 'songs' && "bg-green-500 text-black transition"
                )}>songs</Badge>
                <Badge variant="secondary" onClick={() => setActive('playlists')} className={twMerge(
                    `bg-neutral-800 text-white`, active === 'playlists' && "bg-green-500 text-black transition"
                )}>playlists</Badge>
            </div>
        </div>
    )
}

export default LibraryHeader