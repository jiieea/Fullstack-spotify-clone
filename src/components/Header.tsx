"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { GoHome } from "react-icons/go";
const Header = () => {
    const router = useRouter();
    return (
        <div className='h-[4rem] flex justify-evenly items-center '>
            <div className='flex gap-x-3 p-3'>
                <IoIosArrowBack
                    onClick={() => router.back()}
                    size={30}
                    className='text-neutral-400
             hover:text-neutral-300 
             transition cursor-pointer' />
                <IoIosArrowForward
                    onClick={() => router.forward()}
                    size={30}
                    className='text-neutral-400
                 hover:text-neutral-300
                  transition cursor-pointer' />
            </div>

            <div className='flex gap-x-2'>
                {/* home icon */}
                <div
                onClick={() => router.push('/')}
                    className='bg-neutral-900
                 hover:bg-neutral-800 
                 transition hover:scale-110  
                 p-2 rounded-full'>
                    <GoHome
                        size={30}
                        className='text-neutral-600
                     hover:text-neutral-400
                      transition' />
                </div>
            </div>
        </div>
    )
}

export default Header
