import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react'
import { BsThreeDots , BsThreeDotsVertical } from "react-icons/bs"
import { SlTrash } from "react-icons/sl";
import { Playlist, Song } from "../../types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import useCreatePlaylistModal from "@/hooks/useCreatePlaylistModal";
import { addSongToPlaylist } from "../../utils/addSongToPlaylist";

interface DropDownMenuProps {
    userPlaylist: Playlist[]
    song: Song,
    onHandleRemoveSong : (id : string) => void
}
const DropDownMenu = ({ userPlaylist, song , onHandleRemoveSong}: DropDownMenuProps) => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter()
    const songId = song.id;
    const { onOpen } = useCreatePlaylistModal()

    const handleAddSongToPlaylist = (playlistId : string) => {
        addSongToPlaylist(supabaseClient,playlistId,songId,() => router.refresh())
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* The 'group' class on the parent is what makes the hover effect work on the trigger div */}
                <div className="md:opacity-0 md:group-hover:opacity-100  transition duration-150 group">
                    <BsThreeDots className="hidden md:block text-neutral-400" size={20} />
                    <BsThreeDotsVertical className="text-neutral-400 md:hidden" size={20}  />
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
                                    <DropdownMenuItem key={playlist.id} onClick={() => handleAddSongToPlaylist(playlist.id)}>
                                        {playlist.playlist_name}
                                    </DropdownMenuItem>
                                ))
                            }
                            {/* You could also add a 'Create New Playlist' item */}
                            <DropdownMenuItem className="text-neutral-500" onClick={onOpen}>
                                + Create New Playlist
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                    {/* Original Remove Item */}
                    <DropdownMenuItem onClick={() => onHandleRemoveSong(song.id)}>
                        Remove From This Playlist
                        <DropdownMenuShortcut><SlTrash size={20} className="text-neutral-500" /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownMenu