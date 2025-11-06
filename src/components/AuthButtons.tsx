"use client"

import { User } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import Btn from './Button'

interface AuthButtonsProps {
    onOpen : () => void,
    onHandleLogout : ()=> Promise<void>
    avatar : string | null
    user :  User | null
}
const AuthButtons:React.FC<AuthButtonsProps> = (
    {
        onHandleLogout,
        onOpen,
        user,
        avatar
    }
) => {
    const router = useRouter();
  return (
     <div className="flex gap-x-6  w-[200px] ">
                {
                    !user ? (
                        <>
                            <Btn className="bg-transparent text-neutral-500 p-1 ">Sign Up</Btn>
                            <Btn className='' onClick={onOpen}>Sign In</Btn>
                        </>
                    ) : (
                        <div className='items-center flex gap-x-4 ml-10'>
                            <Btn className='' onClick={onHandleLogout}>SignOut</Btn>
                            {/* // avatar image */}
                            <Btn className='bg-neutral-800 p-1 rounded-full'
                                onClick={() => router.push('/account')}>
                                <div
                                    className='w-8 h-8 rounded-full
                             flex-shrink-0 overflow-y-auto'
                                >
                                    <Image
                                        src={avatar || "/assets/user.png"}
                                        alt='p'
                                        width={30}
                                        height={30}
                                        className='object-cover w-full h-full'
                                    />
                                </div>
                            </Btn>
                        </div>
                    )
                }
            </div>
  )
}

export default AuthButtons
