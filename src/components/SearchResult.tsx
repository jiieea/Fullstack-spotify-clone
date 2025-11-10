import React, { useMemo } from 'react'
import { Song } from '../../types'
import SearchSongs from './SearchSongs'
import useOnplay from '@/hooks/useOnPlay'

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

    const handleOnPlay = useOnplay(filteredSongs);
  

    return (
        <div className="absolute top-full left-0 mt-2 w-full bg-[#282828] border border-neutral-700 rounded-lg
         shadow-2xl z-20   transform  transition-all duration-300 animate-in fade-in slide-in-from-top-1">
            <div className="p-3">
                <h3 className="text-neutral-400 text-xs font-bold uppercase mb-2">
                    {value ? `Search Results for "${value}"` : 'Quick Picks'}
                </h3>
               <div className='max-h-96 overflow-y-auto'>
               {filteredSongs.length > 0 ? (
                    filteredSongs.map((song: Song) => (
                      <SearchSongs 
                        key={ song.id }
                        song={ song }
                        handlePlaySong={ () => handleOnPlay(song.id) }
                      />
                    ))
                ) : (
                    <p className="text-neutral-500 text-sm py-4 text-center">
                        No results found for &quot;{value}&quot;. Try a different query.
                    </p>
                )}
               </div>
            </div>
        </div>
    );
};

export default SearchResult
