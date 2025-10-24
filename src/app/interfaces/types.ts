import { JSX } from "react";
import { Playlist, Song, UserDetails } from "../../../types";


export interface ModalProvidersProps {
  userData?: UserDetails
}

export interface PlaylistPageProps {
  data: Playlist | null
  songs: Song[]
  userData: UserDetails | null
  userPlaylists: Playlist[]
}

export interface ModalProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export interface ModalContainerProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  onChange: (open: boolean) => void;
}

export interface QuickPickDataProps {
  id: number;
  title: string;
  image: string;
}


export interface DailyMixDataProps {
  id: number;
  title: string;
  description: string;
  badge: string;
  color: string;
}

export interface PlayerContentProps {
    song: Song,
    songUrl: string,
    userPlaylists: Playlist[]
}

export
  interface MediaItemProps {
  data: Song,
  index: number
  userPlaylists: Playlist[]
  onHandleRemoveSong: (id: string) => void
  isLoading : boolean
}

export interface HeaderProps {
  data?: UserDetails
}

export interface AccountPageProps {
  songs: Song[],
  playlists: Playlist[]
  userData: UserDetails | null
}



export interface AccountHeaderProps {
  data: UserDetails | null
  songs: Song[]
}

export interface HomePageProps {
  songs : Song[]
  playlist: Playlist[]
}


export interface SidebarProps {
  children: React.ReactNode
  userData: UserDetails | null
  icon: JSX.Element;
  playlists: Playlist[]
  likedSongs: Song[]
}


export interface SidebarItemsProps {
  data: Playlist
  isSidebarOpen: boolean
  userData: UserDetails | null
}

export interface LibraryChildComponentProps {
  userData: UserDetails | null,
  userSongs: Song[]
  userPlaylists: Playlist[],
  liked: number,

}

export interface UserPlaylistsProps {
    data: Playlist
    user: UserDetails
    href: string
}

export interface LibraryContentProps {
  userSongs: Song[]
  userPlaylists: Playlist[]
  userData: UserDetails,
  likedSongs: number
}


export interface LibraryHeaderProps {
  user: UserDetails | null
  active: 'songs' | 'playlists' | ' all ';
  setActive: (filter: 'songs' | 'playlists' | ' all ') => void;
}


export interface PlaylistButtonProps {
  songId : string
  playlists : Playlist[]
}