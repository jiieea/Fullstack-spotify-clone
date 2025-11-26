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
import { BsThreeDots } from "react-icons/bs"
import { SlTrash } from "react-icons/sl";
import { Playlist, Song } from "../../types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useCreatePlaylistModal from "@/hooks/useCreatePlaylistModal";

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


    const handleAddSongToPlaylist = async (playlistId: string) => {

        try {
            const {
                data: existingEntry,
                error: fetchFailed } = await supabaseClient.from('playlist_songs')
                    .select('song_id').eq('song_id', songId).eq('playlist_id', playlistId)
                    .maybeSingle()


            if (existingEntry) {
                toast.warning('The song already in the playlist!')
                return;
            }

            if (fetchFailed) {
                toast.error(fetchFailed.message);
                return;
            }

            const { error } = await supabaseClient.from('playlist_songs')
                .insert({
                    playlist_id: playlistId,
                    song_id: songId
                })

            if (error) {
                toast.error(error.message)
            } else {
                toast.success(`${song.title} added to playlist!`)
                router.refresh()
            }

        } catch (e: unknown) {
            if (e instanceof Error) {
                toast.error(e.message)
                return;
            }
        }
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* The 'group' class on the parent is what makes the hover effect work on the trigger div */}
                <div className="md:opacity-0 md:group-hover:opacity-100  transition duration-150 group">
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