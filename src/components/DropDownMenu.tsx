import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react'
import { BsThreeDots } from "react-icons/bs"
import { SlTrash } from "react-icons/sl";
import { FaPlus } from "react-icons/fa6";

const DropDownMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="opacity-0 group-hover:opacity-100 transition  duration-150">
                    <BsThreeDots className="text-neutral-400" size={20} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="start" side="left">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Add To Playlist
                        <DropdownMenuShortcut><FaPlus  className="text-neutral-500" size={20}/></DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Remove From This Playlist
                        <DropdownMenuShortcut><SlTrash size={20} className="text-neutral-500"/></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownMenu
