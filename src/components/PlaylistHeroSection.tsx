"use client"

import { useUsers } from "@/hooks/useUsers";
import { Playlist, Song } from "../../types";
import HeroSection from "./HeroSection";
import { twMerge } from "tailwind-merge";


interface HeroSectionProps {
    playlists : Playlist[]
    songs : Song[]
}

const DailyPlaylist = ({ playlists  , songs} : HeroSectionProps) => {
    const { user } = useUsers()
return(
    <div className={ twMerge(
        `block` , !user && "hidden"
    )}>
        <HeroSection 
        playlists ={ playlists } songs={ songs }/>
    </div>


    )
};

export default DailyPlaylist;