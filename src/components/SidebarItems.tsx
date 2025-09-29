import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { SidebarItemsProps } from '../../src/app/interfaces/types'
import useLoadImage from '@/hooks/useLoadImage'

const SidebarItems: React.FC<SidebarItemsProps> = ({
  data,
  isSidebarOpen
}) => {
  const { title, author } = data;
  const image = useLoadImage(data);


  return (
    <>
       <div
            className="flex items-center p-3 rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <Image
              src={image || "https://epagljxulfwliwpxygcl.supabase.co/storage/v1/object/public/images/images-Like%20Him-mg216lgx"}
              alt='image'
              width={40}
              height={40}
              className=''
            />
            <span
              className={twMerge(
                `ml-4 text-lg transition-all
                duration-300 overflow-hidden 
                whitespace-nowrap w-0 
                opacity-0` , isSidebarOpen && "w-auto opacity-100"
              )}
            >
              {title}
            </span>
          </div>
    </>
  )
}

export default SidebarItems
