"use client"

import React, { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LuLibrary } from "react-icons/lu";
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlinePlus } from 'react-icons/ai';
import { CreateSheet } from './CreateSheet';

// ... (NavItemProps and NavItem component remain the same) ...

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
    const [openSheet, setOpenSheet] = useState(false);

    const handleOpenSheet = () => {
        setOpenSheet(!openSheet)
    }
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
        // Add a relative container for the positioning of the sheet
        <div className="relative z-50 md:hidden w-full "> 
            {/* The sheet needs to be outside the nav, positioned relative to the container/viewport */}
            
           {
                openSheet && (
                    <>
                        <div
                            // This creates the dark, full-screen overlay
                            className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
                            onClick={handleOpenSheet} // Close the sheet when the backdrop is clicked
                        />
                        <div 
                            // Key: Absolute position to be just above the navbar, z-50 to be above the backdrop
                            className="absolute bottom-full left-0 right-0 z-50 transition" 
                        >
                            <CreateSheet
                            />
                        </div>
                    </>
                )
            }

            <nav
                className="flex items-center justify-around h-[60px] 
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
                <div className='flex flex-col items-center justify-center gap-1 text-neutral-400 hover:text-white transition-colors duration-200 '
                    onClick={handleOpenSheet}
                >
                    <AiOutlinePlus className="text-white " size={25} />
                    <span className='text-[10px]'>Create</span>
                </div>
            </nav>
        </div>
    );
};