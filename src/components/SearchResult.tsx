import React, { useMemo } from 'react'
import { Playlist, Song } from '../../types'
import SearchSongs from './SearchSongs'
import useOnplay from '@/hooks/useOnPlay'
import { useUsers } from '@/hooks/useUsers'
import { useRouter } from 'next/navigation'
import { FaCompactDisc } from 'react-icons/fa' // Import an icon for playlists

interface SearchResultProps {
    value: string,
    searchSong: Song[],
    playlists: Playlist[]
}

const SearchResult: React.FC<SearchResultProps> = ({ value, searchSong, playlists }) => {
    const { user } = useUsers();
    const router = useRouter()

    // searched songs
    const filteredSongs = useMemo(() => {
        if (!value) {
            // Show top 5 items if search is empty (e.g., recent or popular)
            return searchSong.slice(0, 5);
        }
        const lowerCaseValue = value.toLowerCase();
        return searchSong.filter((song: Song) =>
            song.title.toLowerCase().includes(lowerCaseValue) ||
            song.author.toLowerCase().includes(lowerCaseValue)
        ).slice(0, 10); // Limit results
    }, [value, searchSong]);

    // searched Playlists
    const filteredPlaylists = useMemo(() => {
        if (!value) {
            return playlists.slice(0, 5);
        }
        const lowerCaseValue = value.toLocaleLowerCase();
        return playlists.filter((playlist) =>
            playlist.playlist_name.toLocaleLowerCase().includes(lowerCaseValue)).slice(0, 10)
    }, [value, playlists]);

    const handleOnPlay = useOnplay(filteredSongs);

    // Function to navigate to the playlist page
    const handlePlaylistClick = (playlistId: string) => {
        router.push(`/playlist/${playlistId}`);
    };

    return (
        <div className="absolute top-full left-0 mt-2 w-full bg-[#282828] border border-neutral-700 rounded-lg
         shadow-2xl z-20   transform  transition-all duration-300 animate-in fade-in slide-in-from-top-1">
            <div className="p-3">
                {
                    !user ? (
                        <div>
                            <h2 className='text-white font-semibold'>You must login first to search songs</h2>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-neutral-400 text-xs font-bold uppercase mb-2">
                                {value ? `Search Results for "${value}"` : 'Quick Picks'}
                            </h3>
                            <div className='max-h-96 overflow-y-auto'>

                                {/* 1. Display Playlists */}
                                {filteredPlaylists.length > 0 && (
                                    <>
                                        <h4 className='text-white font-bold mt-3 mb-1'>Playlists</h4>
                                        {filteredPlaylists.map((playlist) => (
                                            <div
                                                key={playlist.id}
                                                onClick={() => handlePlaylistClick(playlist.id)}
                                                className='flex items-center gap-x-3 w-full p-2 rounded-md hover:bg-neutral-800/50 cursor-pointer transition'
                                            >
                                                <FaCompactDisc className='text-neutral-400 min-w-4 min-h-4' />
                                                <p className='text-white truncate'>{playlist.playlist_name}</p>
                                            </div>
                                        ))}
                                        {filteredSongs.length > 0 && <hr className='my-2 border-neutral-700' />}
                                    </>
                                )}

                                {/* 2. Display Songs */}
                                <h4 className='text-white font-bold mt-3 mb-1'>Songs</h4>
                                {filteredSongs.length > 0 ? (
                                    filteredSongs.map((song: Song) => (
                                        <SearchSongs
                                            key={song.id}
                                            song={song}
                                            handlePlaySong={() => handleOnPlay(song.id)}
                                        />
                                    ))
                                ) : (
                                    <p className="text-neutral-500 text-sm py-4 text-center">
                                        {value
                                            ? `No songs or playlists found for "${value}". Try a different query.`
                                            : 'No quick song picks available.'
                                        }
                                    </p>
                                )}

                                {/* Display a combined "No results" message if both are empty */}
                                {filteredSongs.length === 0 && filteredPlaylists.length === 0 && (
                                    <p className="text-neutral-500 text-sm py-4 text-center">
                                        No results found for &quot;{value}&quot;. Try a different query.
                                    </p>
                                )}

                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default SearchResult