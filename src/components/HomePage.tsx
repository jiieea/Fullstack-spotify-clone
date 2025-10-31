"use client"

import React, { useRef, useState, useEffect } from 'react'
import QuickPickCard from './QuickCard';
import { HomePageProps } from '../app/interfaces/types'
import HeroSection from './PlaylistHeroSection';
import DailyMixCard from './Song';
import { useUsers } from '@/hooks/useUsers';
import useOnplay from '@/hooks/useOnPlay';
import Arrow from './Arrow';
import Playlists from './Playlists';

const HomePage: React.FC<HomePageProps> = ({
    songs,
    playlist,
    userPlaylists
}) => {
    const [activeTab, setActiveTab] = useState<string>('all');
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrolRight, setCanScrollRight] = useState(false);
    const { user } = useUsers();
    const handlePlay = useOnplay(songs);
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollAmout = 320;

    // scrolling function
    const scrolling = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const amout = direction == 'left' ? -scrollAmout : scrollAmout;
            scrollRef.current.scrollBy({
                left: amout,
                behavior: 'smooth'
            })
        }
    }


    const leftScroll = () => scrolling('left');
    const rigthScroll = () => scrolling('right');

    // check the scrollable
    const checkallPosition = () => {
        if (scrollRef.current) {
            const { scrollLeft: currentScroll, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(currentScroll > 1);
            setCanScrollRight(scrollWidth > clientWidth && currentScroll < scrollWidth - clientWidth - 1);
        }
    }

    // attach event listener
    useEffect(() => {
        const element = scrollRef.current;
        if (element) {
            element.addEventListener('scroll', checkallPosition); // checkAllPosition run after scroll event 
            checkallPosition(); // the function execure immediately 
            return () => {
                element.removeEventListener('scroll', checkallPosition)
            }
        }
    }, [songs.length]);

    return (
        // Changed main wrapper to min-h-screen for full height
        <div className="min-h-screen">
            <div className="bg-black font-sans flex text-gray-400">
                {/* Main Content Area */}
                {/* Added relative and overflow-y-auto for the main content to handle its own scrolling */}
                <main className="flex-1 bg-neutral-900 relative overflow-y-auto pb-24">
                    {/* Content Wrapper - Using consistent padding and space-y for vertical rhythm */}
                    <div className="space-y-4 md:space-y-6 pb-4">

                        {/* Hero Section */}
                        <HeroSection />

                        {/* Filter Tabs */}
                        {/* Consistent horizontal padding on the tabs, moved border to be outside the tabs area if possible, 
                        but kept it here for simplicity and responsiveness */}
                        <div className="flex space-x-3 border-b border-gray-800 pb-4 pt-4 md:pt-0 px-4 sm:px-6 lg:px-8">
                            {/* Mapped over the tabs list for cleaner code */}
                            {[
                                { id: 'all', label: 'All' },
                                { id: 'music', label: 'Music' },
                                { id: 'playlists', label: 'Playlists' }
                            ].map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id)}
                                    className={`
                                    py-1 px-4 rounded-full font-semibold transition-colors duration-200 text-sm whitespace-nowrap
                                    ${activeTab === id ? 'bg-white text-black' : 'bg-gray-700/50 text-white hover:bg-gray-700'}
                                `}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
                        lg:grid-cols-3 xl:grid-cols-4  gap-4 
                        px-4 sm:px-6 lg:px-8 ">
                            {userPlaylists.map(item => (
                                <QuickPickCard key={item.id} data={item} />
                            ))}
                        </div>

                        {/* Section Title & "Show All" Link - Consistent padding and pt-8 for separation */}
                        <div className="flex justify-between items-center pt-8 px-4 sm:px-6 lg:px-8">
                            <h2 className="text-xl md:text-2xl font-bold text-white hover:underline cursor-pointer">
                                For you
                            </h2>
                            <a href="#" className="text-sm font-bold uppercase text-gray-400 hover:underline">
                                See all
                            </a>
                        </div>
                        <div className="relative">
                            <Arrow
                                direction="left"
                                isVisible={canScrollLeft}
                                onClick={leftScroll}
                            />
                            {
                                user && (
                                    <div className="flex space-x-2 overflow-x-scroll 
                                horizontal-scroll-container pb-8 px-4
                                sm:px-6 lg:px-8"
                                        ref={scrollRef}
                                    >
                                        <style>
                                            {`
                                .horizontal-scroll-container::-webkit-scrollbar {
                                display: none;
                                }
                                .horizontal-scroll-container {
                                -ms-overflow-style: none;  /* IE and Edge */
                                scrollbar-width: none;  /* Firefox */
                                }
                                `}
                                        </style>
                                        {songs.map(item => (
                                            <DailyMixCard
                                                key={item.id}
                                                song={item}
                                                onHandlePlay={(id: string) => handlePlay(id)}
                                            />
                                        ))}
                                    </div>
                                )
                            }
                            <Arrow
                                isVisible={canScrolRight}
                                onClick={rigthScroll}
                                direction="right "
                            />
                        </div>
                        <div className="flex justify-between items-center pt-8 px-4 sm:px-6 lg:px-8">
                            <h2 className="text-xl md:text-2xl font-bold text-white hover:underline cursor-pointer">
                                Playlist Recomendation
                            </h2>
                            <a href="#" className="text-sm font-bold uppercase text-gray-400 hover:underline">
                                See all
                            </a>
                        </div>
                        <div className='flex pb-8 overflow-x-scroll  horizontal-scroll-container
                        space-x-2 px-4  '
                        >
                            {
                                playlist.map((playlist) => (
                                    <Playlists
                                        key={playlist.id}
                                        playlistData={playlist}
                                    />
                                ))
                            }

                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default HomePage