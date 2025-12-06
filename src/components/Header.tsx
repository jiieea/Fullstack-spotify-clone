"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUsers } from '@/hooks/useUsers';
import { HeaderProps } from '../app/interfaces/types'
import useLoadAvatar from '@/hooks/useLoadAvatar';
import ArrowPage from './ArrowPage';
import AuthButtons from './AuthButtons';
import { HomeAndSearch } from './HomeAndSearch';
import handleLogOut from '../../utils/handleLogout';

const Header: React.FC<HeaderProps> = ({
    data,
    searchSongs,
    playlists
}) => {
    const router = useRouter();
    const { user } = useUsers()
    const { onOpen } = useAuthModal();
    const supabase = useSupabaseClient();
    const avatar = useLoadAvatar(data!);

    // handle logout user
const onHandleLogout = async() => {
    handleLogOut(supabase)
}
    return (
        //  arrow forward and back
        <div className="h-[4rem] flex sticky top-0 z-10 bg-black items-center justify-between px-3 w-full gap-x-3  ">
            <Image
                src={'/assets/soundwave.png'}
                alt='icon'
                width={25}
                height={25}
                onClick={() => router.push('/')}
                className='w-[65px]  p-3  h-[65px] object-cover rounded-full hover:cursor-pointer'
            />
            <ArrowPage />
            {/* Home and Search */}
            <HomeAndSearch
            playlists={ playlists }
            searchSongs={searchSongs}
            />
            {/* Right: Auth Buttons */}
            <AuthButtons
                onHandleLogout={onHandleLogout}
                avatar={avatar}
                onOpen={onOpen}
                user={user}
            />
        </div>
    )
}

export default Header
