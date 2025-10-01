import {JSX} from "react";
import { Song, UserDetails } from "../../../types";


export interface ModalProvidersProps {
  userData ?: UserDetails
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

export interface HeaderProps {
  data ?: UserDetails
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