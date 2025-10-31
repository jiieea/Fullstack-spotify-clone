import React from 'react'

interface SortContentProps {
    active : string,
    setActive : React.Dispatch<React.SetStateAction<string>>
}
export const SortContent: React.FC<SortContentProps> = (
    {
        active,
        setActive
    }
) => {
  return (
     <div className="flex space-x-3 border-b border-gray-800 pb-4 pt-4 md:pt-0 px-4 sm:px-6 lg:px-8">
                            {/* Mapped over the tabs list for cleaner code */}
                            {[
                                { id: 'all', label: 'All' },
                                { id: 'music', label: 'Music' },
                                { id: 'playlists', label: 'Playlists' }
                            ].map(({ id, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setActive(id)}
                                    className={`
                                    py-1 px-4 rounded-full font-semibold transition-colors duration-200 text-sm whitespace-nowrap
                                    ${active === id ? 'bg-white text-black' : 'bg-gray-700/50 text-white hover:bg-gray-700'}
                                `}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
  )
}
