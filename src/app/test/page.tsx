import Image from 'next/image';
import React from 'react';
const PlaylistView = () => {
  // Dummy data for the tracks list
  const tracks = [
    {
      id: 1,
      title: 'Apocalypse',
      artist: 'Cigarettes After Sex',
      album: 'Cigarettes After Sex',
      dateAdded: '12 avr. 2020',
      duration: '4:50',
    },
    {
      id: 2,
      title: 'Nothing’s Gonna Hurt You Baby',
      artist: 'Cigarettes After Sex',
      album: 'L',
      dateAdded: '12 avr. 2020',
      duration: '4:48',
    },
    {
      id: 3,
      title: 'Heavenly',
      artist: 'Cigarettes After Sex',
      album: 'Cry',
      dateAdded: '13 avr. 2020',
      duration: '4:49',
    },
    {
      id: 4,
      title: 'Affection',
      artist: 'Cigarettes After Sex',
      album: 'Affection',
      dateAdded: '17 avr. 2020',
      duration: '5:11',
    },
    {
      id: 5,
      title: 'Sweet',
      artist: 'Cigarettes After Sex',
      album: 'Cigarettes After Sex',
      dateAdded: '17 avr. 2020',
      duration: '4:52',
    },
  ];

  return (
    <div className="bg-neutral-900 text-white min-h-screen">
      {/* Playlist Header Section */}
      <header className="flex items-end p-8 bg-gradient-to-b from-neutral-800 to-neutral-900">
        {/* Album Art Container (using a placeholder based on the image) */}
        <div className="w-56 h-56 shadow-2xl mr-6">
          <Image
            src="/assets/liked.png"
            alt="Album Art"
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Playlist Info */}
        <div className="flex flex-col">
          <span className="text-sm font-bold">Playlist publique</span>
          <h1 className="text-7xl font-extrabold my-2 tracking-tight">
            best of cigarettes after sex
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            rha v bust only.
          </p>
          <div className="flex items-center text-sm mt-2 text-neutral-400">
            {/* User Icon/Avatar Placeholder */}
            <div className="w-5 h-5 bg-neutral-600 rounded-full mr-1"></div>
            <span className="font-bold text-white mr-1">nyanonymous</span>
            <span>et</span>
            <span className="font-bold text-white mx-1">lizzy</span>
            <span className="mx-1">•</span>
            <span>320 090 sauvegardes</span>
            <span className="mx-1">•</span>
            <span>59 titres, 4 h 1 min</span>
          </div>
        </div>
      </header>

      {/* Playlist Controls and Track List */}
      <div className="px-8 pt-4">
        {/* Controls Bar (Play, Like, More Options) */}
        <div className="flex items-center space-x-6 mb-4">
          {/* Play Button */}
          <button className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:scale-105 transition duration-150 ease-in-out">
            {/* Play Icon (Simple Triangle) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-black fill-current ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* Like Button */}
          <button className="text-neutral-400 hover:text-white">
            {/* Heart Icon (Placeholder for the actual icon from the image) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* More Options Button */}
          <button className="text-neutral-400 hover:text-white">
            {/* Three Dots Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
        </div>

        {/* Track List Header */}
        <div className="grid grid-cols-12 text-neutral-400 uppercase text-xs font-semibold py-2 border-b border-neutral-700 sticky top-0 bg-neutral-900/90 backdrop-blur-sm z-10">
          <div className="col-span-1 pl-4">#</div>
          <div className="col-span-7">Titre</div> {/* CHANGED: Increased span from 4 to 7 */}
          <div className="col-span-3">Ajouté le</div> {/* CHANGED: span remains 3 */}
          <div className="col-span-1 text-right pr-4">
            {/* Clock Icon (Placeholder for the actual icon from the image) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Track List Items */}
        <div>
          {tracks.map((track, index) => (
            <div
              key={track.id}
              className="grid grid-cols-12 items-center py-2 px-4 rounded-lg hover:bg-neutral-800 transition duration-150 ease-in-out cursor-pointer group"
            >
              {/* Track Number */}
              <div className="col-span-1 text-neutral-400 group-hover:text-white">
                {index + 1}
              </div>
              {/* Title and Artist */}
              <div className="col-span-7 flex flex-col"> {/* CHANGED: Increased span from 4 to 7 */}
                <span className="text-white font-medium">{track.title}</span>
                <span className="text-sm text-neutral-400 hover:underline">
                  {track.artist}
                </span>
              </div>

              {/* Date Added */}
              <div className="col-span-3 text-neutral-400 text-sm"> {/* CHANGED: span remains 3 */}
                {track.dateAdded}
              </div>
              {/* Duration */}
              <div className="col-span-1 text-right text-neutral-400 text-sm pr-4">
                {track.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;