"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import Image from 'next/image';
import useAuthModal from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUsers } from '@/hooks/useUsers';
import { toast } from 'sonner';
import { HeaderProps } from '../app/interfaces/types'
import useLoadAvatar from '@/hooks/useLoadAvatar';
import qs from 'query-string'
import useDebounceValue from '@/hooks/useDebounceValue';
import ArrowPage from './ArrowPage';
import AuthButtons from './AuthButtons';
import { HomeAndSearch } from './HomeAndSearch';

const Header: React.FC<HeaderProps> = ({
    data
}) => {
    const router = useRouter();
    const { user } = useUsers()
    const { onOpen } = useAuthModal();
    const supabase = useSupabaseClient();
    const avatar = useLoadAvatar(data!);
    const [value, setValue] = useState<string>("");
    const debounceValue = useDebounceValue<string>(value, 500)
    const isInitialAmount = useRef(true);


    useEffect(() => {
        if (isInitialAmount.current) {
            isInitialAmount.current = false; // set the useRef to false
            return;
        }
        const query = {
            title: debounceValue
        }
        const url = qs.stringifyUrl({
            url: '/',
            query: query,

        }, {
            skipEmptyString: true, skipNull: true
        })

        router.push(url);
    }, [router , debounceValue])


    // handle logout user
    const handleLogout = async () => {
        try {
            const { error: logoutError } = await supabase.auth.signOut();
            router.refresh();
            if (logoutError) {
                toast.error('failed to logout');
            } else {
                toast.success('logout successfully')
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(`failed to logout ${e.message}`)
            }
        }
    }
    return (
        //  arrow forward and back
        <div className="h-[4rem] flex sticky top-0 z-10 bg-black items-center justify-between px-3 w-full gap-x-3   ">
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
                value={ value }
                setValue={ setValue }
            />
            {/* Right: Auth Buttons */}
            <AuthButtons
                onHandleLogout={handleLogout}
                avatar={avatar}
                onOpen={onOpen}
                user={user}
            />
        </div>
    )
}

export default Header
