"use client"

import React, { useState } from 'react'
import QuickPickCard from './QuickCard';
import { HomePageProps } from '../app/interfaces/types'
import HeroSection from './PlaylistHeroSection';
import DailyMixCard from './Song';
import { useUsers } from '@/hooks/useUsers';
import useOnplay from '@/hooks/useOnPlay';

const HomePage: React.FC<HomePageProps> = ({
    songs,
    playlist
}) => {
    // Renamed 'Tout' to 'all' for internal consistency, kept display text as 'Tout' in the map
    const [activeTab, setActiveTab] = useState<string>('all');
    const { user }  = useUsers();
    const handlePlay = useOnplay(songs);

    // if(!user) {
    //     return <div className='flex justify-center  items-center font-bold text-white'>Login first  to see your songs and playlists</div>
    // }

    return (
        // Changed main wrapper to min-h-screen for full height
        <div className="min-h-screen">
            <div className="bg-black font-sans flex text-gray-400">
                {/* Main Content Area */}
                {/* Added relative and overflow-y-auto for the main content to handle its own scrolling */}
                <main className="flex-1 bg-[#121212] relative overflow-y-auto pb-24">
                    {/* Content Wrapper - Using consistent padding and space-y for vertical rhythm */}
                    <div className="space-y-8 md:space-y-12 pb-4">

                        {/* Hero Section */}
                        <HeroSection />

                        {/* Filter Tabs */}
                        {/* Consistent horizontal padding on the tabs, moved border to be outside the tabs area if possible, 
                        but kept it here for simplicity and responsiveness */}
                        <div className="flex space-x-3 border-b border-gray-800 pb-4 pt-4 md:pt-0 px-4 sm:px-6 lg:px-8">
                            {/* Mapped over the tabs list for cleaner code */}
                            {[
                                { id: 'all', label: 'Tout' },
                                { id: 'music', label: 'Musique' },
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

                        {/* Quick Picks Grid - Ensured more aggressive column changes for small screens */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 px-4 sm:px-6 lg:px-8">
                            {playlist.map(item => (
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

                        {/* Daily Mixes (Horizontal Scroll) */}
                        {/* Custom CSS for hidden scrollbar on specific browsers */}
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
                        {/* Consistent padding and increased bottom padding for scroll area */}
                        {
                            user && (
                                <div className="flex space-x-6 overflow-x-scroll horizontal-scroll-container pb-8 px-4 sm:px-6 lg:px-8">
                                    {songs.map(item => (
                                        <DailyMixCard
                                            key={item.id}
                                            song={item}
                                            onHandlePlay={(id : string) => handlePlay(id)}
                                        />
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </main>

                {/* Player Bar Placeholder - Important for fixed positioning */}
                {/* Added fixed positioning and z-index to ensure it sits on top and doesn't get covered */}
                {/* <footer className="fixed bottom-0 left-0 right-0 bg-[#181818] h-20 border-t border-black z-30 flex items-center justify-center text-sm text-white">
                <p>Placeholder for Player Bar</p>
            </footer> */}
            </div>
        </div>
    )
}

export default HomePage