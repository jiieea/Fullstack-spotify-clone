"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import icon from '../../public/icon.png'
import Btn from './Button'
import Image from 'next/image';


const Header = () => {
    const router = useRouter();
    return (
        //  arrow forward and back
        <div className="h-[4rem] flex items-center justify-between px-3 w-full gap-x-3 ">
             <Image  src={icon} alt='icon' width={50} height={50} 
                    className=''
                />
            {/* Left: Arrows */}
            <div className="flex gap-x-3 p-3  items-center">
               
                <IoIosArrowBack
                    onClick={() => router.back()}
                    size={30}
                    className="text-neutral-400 hover:text-neutral-300 transition cursor-pointer"
                />
                <IoIosArrowForward
                    onClick={() => router.forward()}
                    size={30}
                    className="text-neutral-400 hover:text-neutral-300 transition cursor-pointer"
                />
            </div>

            {/* Center: Home + Search */}
            <div className="flex items-center gap-x-4 flex-grow justify-center">
                <div
                    onClick={() => router.push('/')}
                    className="bg-neutral-900 hover:bg-neutral-800 transition hover:scale-110 p-2 rounded-full"
                >
                    <GoHome
                        size={30}
                        className="text-neutral-600 hover:text-neutral-400 transition"
                    />
                </div>
                <div className="relative w-full max-w-md">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500">
                        <IoSearch size={25} className="text-neutral-500" />
                    </span>
                    <input
                        type="text"
                        id="song-search"
                        placeholder="Search for songs, artists..."
                        className="w-full bg-[#121212] text-white placeholder-gray-400 rounded-full py-3 pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    />
                </div>
            </div>

            {/* Right: Auth Buttons */}
            <div className="flex gap-x-6  w-[200px]">
                <Btn className="bg-transparent text-neutral-500 p-1 ">Sign Up</Btn>
                <Btn className='' >Sign In</Btn>
            </div>
        </div>
    )
}

export default Header
