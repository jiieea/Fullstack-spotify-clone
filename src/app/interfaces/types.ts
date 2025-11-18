import { Dispatch, JSX, SetStateAction } from "react";
import { Playlist, Song, UserDetails } from "../../../types";


export interface ModalProvidersProps {
  userData?: UserDetails
}

export interface SortButtonSheetProps {
    onHandleSortByArtist : () => void,
    onHandleSortByTitle : () =>void,
    sort : string,
    onHandleSortByDate : () => void
}

export interface PlaylistOptionProps {
  playlistData: Playlist
  disabled : boolean
}

export interface PlaylistPageProps {
  data: Playlist | null
  songs: Song[]
  userData: UserDetails | null
  userPlaylists: Playlist[]
  userName : UserDetails
  allSongs : Song[]
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
  onHandleRemoveSong: (songId: string) => void
  isLoading: boolean,
  onHandlePlay: (id: string) => void
}

export interface HeaderProps {
  data?: UserDetails
  searchSongs : Song[]
}

export interface AccountPageProps {
  songs: Song[],
  playlists: Playlist[]
  userData: UserDetails | null
}

export interface UpdateDialogProps {
    playlistData: Playlist
    disabled : boolean
}

export interface AccountHeaderProps {
  data: UserDetails | null
  songs: Song[]
}

export interface HomePageProps {
  songs: Song[]
  playlist: Playlist[]
  userPlaylists: Playlist[]
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
  songId: string
  playlists: Playlist[]
}
export interface PlaylistContentProps {
  songs: Song[];
  allSongs : Song[]
  dataOwner : UserDetails,
  data: Playlist;
  userPlaylist: Playlist[];
  onHandlePlay: (id: string) => void;
}


export interface SearchContextType {
    searchValue: string,
    isPlaying: boolean, setIsPlaying: Dispatch<SetStateAction<boolean>>,
    setSearchValue: Dispatch<SetStateAction<string>>
    isShuffle: boolean,
    setIsShuffle: Dispatch<SetStateAction<boolean>>
}


export interface ContainerProviderProps {
    children : React.ReactNode,
    userName : string | null
}