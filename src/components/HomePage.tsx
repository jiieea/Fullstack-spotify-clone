"use client"

import React, { useState } from 'react'
import QuickPickCard from './QuickCard';
import { HomePageProps} from '../app/interfaces/types'
import HeroSection from './PlaylistHeroSection';
import DailyMixCard from './Song';

const HomePage:React.FC<HomePageProps> = ({
    songs,
    playlist
}) => {
    const [activeTab, setActiveTab] = useState<string>('all');
    // const [data , setData ] = useState<Song[]>(songs)
    return (
        <div>
          <div className="bg-black  font-sans flex text-gray-400 ">
            {/* Main Content Area */}
            <main className="flex-1 bg-[#121212] ">
                {/* Content Wrapper */}
                <div className=" space-y-12">
                    {/* Hero Section */}
                    <HeroSection />

                    {/* Filter Tabs */}
                    <div className="flex space-x-3 border-b border-gray-800 pb-4 pt-4 md:pt-0 px-4">
                        {['Tout', 'Musique', 'Playlists'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                                    py-1 px-4 rounded-full font-semibold transition-colors duration-200 text-sm
                                    ${activeTab === tab ? 'bg-white text-black' : 'bg-gray-700/50 text-white hover:bg-gray-700'}
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Quick Picks Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
                        {playlist.map(item => (
                            <QuickPickCard key={item.id} data={item}/>
                        ))}
                    </div>

                    {/* Section Title & "Show All" Link */}
                    <div className="flex justify-between items-center pt-8 px-4">
                        <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
                             pour Jiie de Châtillon
                        </h2>
                        <a href="#" className="text-sm font-bold uppercase text-gray-400 hover:underline">
                            Tout afficher
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
                    <div className="flex space-x-6 overflow-x-scroll horizontal-scroll-container pb-4 px-4">
                        {songs.map(item => (
                            <DailyMixCard 
                                key={item.id} 
                                song={ item }
                            />
                        ))}
                    </div>
                </div>
            </main>
            
            {/* Player Bar Placeholder (Optional but typical for Spotify) */}
            {/* <footer className="fixed bottom-0 left-0 right-0 bg-[#181818] h-20 border-t border-black z-20 flex items-center justify-center text-sm text-white">
                <p>Placeholder for Player Bar</p>
            </footer> */}
        </div>
        </div>
    )
}

export default HomePage
