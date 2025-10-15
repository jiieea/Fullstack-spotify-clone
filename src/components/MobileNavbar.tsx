"use client"

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { LuLibrary } from "react-icons/lu";
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import SheetLibrary from './Sheet';
interface NavItemProps {
    href: string,
    icon: React.JSX.Element,
    label: string
    active: boolean
}

// Helper function to create a navigation item
const NavItem: React.FC<NavItemProps> = ({ href, icon, label, active }) => (
    <>
        <Link
            href={href}
            className={twMerge(
                `flex flex-col items-center justify-center gap-1 text-neutral-400 hover:text-white transition-colors duration-200`,
                active && `text-white`
            )}>
            {React.cloneElement(icon, { size: 24 })}
            <span className='text-[10px]'>{label}</span>
        </Link>

    </>
);

export const MobileNavbar = () => {
    const pathname = usePathname();

    const routes = useMemo(() =>
        [
            {
                icon: <GoHome />,
                label: 'Home',
                href: '/',
                active: pathname === "/",
            },
            {
                icon: <IoSearchOutline />,
                label: 'Search',
                href: '/search',
                active: pathname === '/search',
            },
            {
                icon: <LuLibrary />,
                label: ' Library',
                href: '/library',
                active: pathname === '/library',
            },

        ], [pathname]);

    return (
        <nav
            className="flex  items-center justify-around h-[60px] md:hidden 
            bg-neutral-900/60 backdrop-blur-xl text-white px-4 border-t border-none"
        >
            {routes.map((route) => (
                <NavItem
                    key={route.label}
                    href={route.href}
                    icon={route.icon}
                    label={route.label}
                    active={route.active}
                />
            ))}
           <div className='flex flex-col items-center justify-center gap-1 text-neutral-400 hover:text-white transition-colors duration-200'>
                <SheetLibrary />
               <span className='text-[10px]'>Create</span>
           </div>
        </nav>
    );
};