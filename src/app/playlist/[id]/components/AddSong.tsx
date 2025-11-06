import React, { Dispatch, SetStateAction } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { Playlist, Song } from '../../../../../types';
import { IoSearchOutline } from "react-icons/io5";
import { SongContainer } from '@/components/SongContainer';



interface AddSongProps {
    songs: Song[],
    allSongs: Song[]
    playlistData: Playlist
    setIsAddSheetOpen: Dispatch<SetStateAction<boolean>>
}

const AddSong = (
    {
        allSongs,
        playlistData,
        setIsAddSheetOpen
    }: AddSongProps
) => {
    return (
        <div className='bg-neutral-900 z-10 h-[85vh] max-w-lg p-4 mt-15 md:p-6 fixed inset-0'>
            <header className='flex items-center justify-start gap-x-3 mb-4 pt-2'>
                <button onClick={() => setIsAddSheetOpen(false)}>
                    <FaArrowLeft size={15} className='text-white' />
                </button>
                <p className='text-lg font-bold flex-1 text-center pr-8'>add to this playlist</p>
            </header>

            {/* container for songs */}
            <div className='mb-4'>
                <div className='flex bg-neutral-800 rounded-2xl items-center space-x-3 p-3'>
                    <IoSearchOutline size={20} className='text-white' />
                    <input
                        type="text"
                        placeholder="Search song"
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-base"
                        aria-label="Search for tracks"
                    />
                </div>
            </div>

            <div className='bg-neutral-800/70 p-2'>
                <section className="mb-4 p-3">
                    <h2 className="text-sm text-gray-400 uppercase font-bold mb-3">
                        Suggestion
                    </h2>
                    <p className="text-xs text-gray-500 mb-4">
                        Based on songs you have added
                    </p>
                </section>

                <main className='space-y-2 mb-3 h-[48vh] rounded-2xl overflow-y-auto p-2'>
                    {
                        allSongs.map((song) => (
                            <SongContainer
                                key={song.id}
                                song={song}
                                playlistData={playlistData}
                            />
                        ))
                    }
                </main></div>
        </div>
    )
}

export default AddSong;
