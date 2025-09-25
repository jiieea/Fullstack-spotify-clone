import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'
import logo from '../../public/logo.jpg'
interface SidebarItemsProps {
  icon: IconType
  href: string,
  label: string
  active: boolean
  isSidebarOpen: boolean
}

const SidebarItems: React.FC<SidebarItemsProps> = ({
  icon: Icon,
  href,
  label,
  isSidebarOpen
}) => {
  return (
    <Link
      href={href}
      className="flex items-center p-3 rounded-xl hover:bg-neutral-800 transition-colors"
    >
   <Image 
    src={logo}
    alt='logo'
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
        {label}
      </span>
    </Link>
  )
}

export default SidebarItems
