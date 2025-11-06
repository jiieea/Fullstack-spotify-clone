
import React from 'react'
import { SlCloudUpload } from 'react-icons/sl'
import { TbMusicPlus } from 'react-icons/tb'

export const CreateSheet = () => {
    return (
        <div
            className={`
                border-black
                p-0 
                rounded-xl 
                h-auto
                bg-neutral-800
                w-full 
            `}
        >
            {/* The grab-handle/divider for aesthetics */}
            <div className="w-full flex justify-center">
                <div className="w-[55px] bg-neutral-500 rounded-2xl h-[5px] mt-2"></div>
            </div>

            {/* The content container */}
            <div className=" flex flex-col gap-y-5 mt-2 p-3 pb-4">
                {/* add songs */}
                <div
                    className="flex gap-x-3 items-center cursor-pointer hover:bg-neutral-800 p-2 rounded-lg transition"
                >
                    {/* song icon */}
                    <div className="bg-neutral-700 rounded-full p-4">
                        <SlCloudUpload size={30} className="text-neutral-400  " />
                    </div>
                    <div className="flex flex-col text-neutral-500">
                        <h1 className="font-semibold text-white"> Song</h1>
                        <p className="text-[15px]">You can add songs from your local device</p>
                    </div>
                </div>

                {/* add playlist */}
                <div
                    className="flex gap-x-3 items-center cursor-pointer hover:bg-neutral-800 p-2 rounded-lg transition"
                >
                    {/* playlist icon */}
                    <div className="bg-neutral-700 rounded-full p-4">
                        <TbMusicPlus size={30} className="text-neutral-400  " />
                    </div>
                    <div className="flex flex-col  text-neutral-500">
                        <h1 className="font-semibold text-white"> Playlist</h1>
                        <p className="text-[15px] text-neutral-500">You can create a playlist</p>
                    </div>
                </div>
            </div>
        </div>
    )
}