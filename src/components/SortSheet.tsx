import React from 'react'
import { FaCheck } from "react-icons/fa6";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { twMerge } from 'tailwind-merge';
import { TbArrowsSort } from 'react-icons/tb';
import Button from './Button';
import { SortButtonSheetProps } from '../app/interfaces/types'



const SortButtonSheet: React.FC<SortButtonSheetProps> = (
    {
        onHandleSortByTitle,
        onHandleSortByArtist,
        sort,
        onHandleSortByDate
    }
) => {

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button 
            className='bg-neutral-800 text-white
                 px-5 py-2 flex items-center gap-x-2'><TbArrowsSort size={15} /><span>Sort</span></Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="  
             border-neutral-700
          p-0 
          rounded-t-xl 
          h-auto
          bg-neutral-800 ">
                <div className="w-full flex justify-center">
                    <div className="w-[35px] bg-neutral-500 rounded-2xl h-[5px] mt-2"></div>
                </div>
                <div className='flex flex-col gap-y-6 p-3'>
                    <p className='text-white font-bold'>Sort By</p>
                    <SheetClose asChild>
                        <div className='flex justify-between items-center'>
                            <p className='text-white font-semibold text-[15px]' onClick={onHandleSortByTitle}>Sort By Title</p>
                            <FaCheck size={25} className={twMerge(
                                `text-green-500 hidden`, sort === 'by title' && "block"
                            )} />
                        </div>
                    </SheetClose>
                    <SheetClose asChild>
                        <div className="flex justify-between">
                            <p className='text-white font-semibold text-[15px]' onClick={onHandleSortByArtist}>Sort By Artist</p>
                            <FaCheck size={25} className={twMerge(
                                `text-green-500 hidden`, sort === 'by artist' && "block"
                            )} />
                        </div>
                    </SheetClose>
                    <SheetClose asChild>
                        <div className='flex justify-between items-center'>
                            <p className='text-white font-semibold text-[15px]' onClick={onHandleSortByDate}>Recently Add</p>
                            <FaCheck size={25} className={twMerge(
                                `text-green-400 hidden`, sort === 'add recently' && "block"
                            )} />
                        </div>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default SortButtonSheet