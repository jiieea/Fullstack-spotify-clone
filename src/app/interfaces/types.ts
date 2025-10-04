import {JSX} from "react";
import { Playlist, Song, UserDetails } from "../../../types";


export interface ModalProvidersProps {
  userData ?: UserDetails
}

export interface PlaylistPageProps {
  data : Playlist | null
  userData : UserDetails | null
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
    data: Song
}

export interface HeaderProps {
  data ?: UserDetails
}

export interface AccountPageProps {
  songs: Song[]
}



export interface AccountHeaderProps {
  data :  UserDetails | null
  songs : Song[]
}


export interface SidebarProps {
    children: React.ReactNode
    icon: JSX.Element;
    songs : Song[]
  }


  export interface SidebarItemsProps {
    data : Song
    isSidebarOpen: boolean
  }