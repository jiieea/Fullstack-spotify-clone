import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    // Assuming these Sub components are available from your import path
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react'
import { BsThreeDots } from "react-icons/bs"
import { SlTrash } from "react-icons/sl";
import { FaPlus } from "react-icons/fa6";
// Icon for a submenu/arrow indicator
import { IoIosArrowForward } from "react-icons/io"; 
import { Playlist } from "../../types";


interface DropDownMenuProps {
    userPlaylist : Playlist[]
}
const DropDownMenu = ({ userPlaylist } : DropDownMenuProps) => {
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* The 'group' class on the parent is what makes the hover effect work on the trigger div */}
                <div className="opacity-0 group-hover:opacity-100 transition duration-150 group"> 
                    <BsThreeDots className="text-neutral-400" size={20} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="start" side="left">
                <DropdownMenuGroup>
                    <DropdownMenuSub >
                        <DropdownMenuSubTrigger className="cursor-pointer ">
                            <span >Add To Playlist</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent className="bg-neutral-800">
                            {/* Submenu Items */}
                     {
                        userPlaylist.map((playlist) => (
                            <DropdownMenuItem key={playlist.id}>
                                {playlist.playlist_name}
                            </DropdownMenuItem>
                        ))
                     }
                            {/* You could also add a 'Create New Playlist' item */}
                            <DropdownMenuItem className="text-blue-500">
                                + Create New Playlist
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Original Remove Item */}
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