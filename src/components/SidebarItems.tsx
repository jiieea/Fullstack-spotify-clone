import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
interface SidebarItemsProps {
    icon : IconType
    href : string,
    label :  string
    active : boolean
    isSidebarOpen : boolean
}

const SidebarItems:React.FC<SidebarItemsProps> = ({
    icon : Icon,
    href,
    label,
    active,
    isSidebarOpen
}) => {
  return (
        <Link
            href={href}
            className="flex items-center p-3 rounded-xl hover:bg-gray-700 transition-colors"
          >
          <Icon  size={25}></Icon>
            <span
              className={`ml-4 text-lg transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}
            >
              { label }
            </span>
          </Link>
  )
}

export default SidebarItems
