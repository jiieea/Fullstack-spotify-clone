
export interface Song {
    id: string,
    user_id: string,
    title: string,
    author: string,
    song_path: string,
    image_path: string,
    created_at: string
}


export interface AccountContentProps {
    user: UserDetails,
    songs: Song[],
    playlists: Playlist[]
}

export interface Playlist {
    id: string,
    user_id: string,
    playlist_name: string,
    playlist_image?: string
    description?: string
}
export interface UserDetails {
    id?: string,
    full_name?: string,
    avatar_url?: string,
}

