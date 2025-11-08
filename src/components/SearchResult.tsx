import { ChevronRight, Music } from 'lucide-react'
import React, { useMemo } from 'react'
import { Song } from '../../types'

interface SearchResultPrpops {
    value : string,
    searchSong : Song[]
    handlePlaySong : () => void
}

const SearchResult: React.FC<SearchResultPrpops> = ({ value, searchSong, handlePlaySong }) => {
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

    const handleItemClick = () => {
        // Inform the parent component of the click
        handlePlaySong();
    };

    return (
        <div className="absolute top-full left-0 mt-2 w-full bg-[#282828] border border-neutral-700 rounded-lg
         shadow-2xl z-20 max-h-96 overflow-y-auto transform transition-all duration-300 animate-in fade-in slide-in-from-top-1">
            <div className="p-3">
                <h3 className="text-neutral-400 text-xs font-bold uppercase mb-2">
                    {value ? `Search Results for "${value}"` : 'Quick Picks'}
                </h3>
                {filteredSongs.length > 0 ? (
                    filteredSongs.map((song: Song) => (
                        <div
                            key={song.id}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-[#3e3e3e] transition cursor-pointer"
                            onClick={handleItemClick}
                        >
                            <div className="flex items-center gap-3">
                                <Music size={18} className="text-green-500 flex-shrink-0" />
                                <div className="truncate">
                                    <p className="text-white text-sm font-medium truncate">{song.title}</p>
                                    <p className="text-neutral-400 text-xs truncate">{song.author}</p>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-neutral-500 flex-shrink-0" />
                        </div>
                    ))
                ) : (
                    <p className="text-neutral-500 text-sm py-4 text-center">
                        No results found for &quot;{value}&quot;. Try a different query.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchResult
