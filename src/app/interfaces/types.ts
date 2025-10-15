import {JSX} from "react";
import { Playlist, Song, UserDetails } from "../../../types";


export interface ModalProvidersProps {
  userData ?: UserDetails
}

export interface PlaylistPageProps {
  data : Playlist | null
  songs : Song[]
  userData : UserDetails | null
  userPlaylists : Playlist[]
}

export interface ModalProps {
    isOpen : boolean
    onOpen : () => void
    onClose : () => void
}

export interface ModalContainerProps {
    children: React.ReactNode;
    title: string;
    description: string;
    isOpen: boolean;
    onChange: (open: boolean) => void;
}

export 
interface MediaItemProps {
    data: Song,
    index : number
    userPlaylists : Playlist[]
    onHandleRemoveSong : (id : string) => void
}

export interface HeaderProps {
  data ?: UserDetails
}

export interface AccountPageProps {
  songs: Song[],
  playlists : Playlist[]
  userData : UserDetails | null
}



export interface AccountHeaderProps {
  data :  UserDetails | null
  songs : Song[]
}


export interface SidebarProps {
    children: React.ReactNode
    userData : UserDetails  | null
    icon: JSX.Element;
    playlists : Playlist[]
    likedSongs : Song[]
  }


  export interface SidebarItemsProps {
    data : Playlist
    isSidebarOpen: boolean
    userData : UserDetails |null
  }