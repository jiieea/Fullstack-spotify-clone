import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
const Arrow = (
    {
        isVisible,
        onClick,
        direction
    }: { direction: 'left' | 'right ', onClick: () => void, isVisible: boolean }
) => {

    return (
        <button
            onClick={onClick}
            // Use opacity for visual effect and pointer-events-none when hidden
            className={twMerge(
                `
                absolute top-1/2 -translate-y-1/2 z-10 
                bg-black/70 text-white rounded-full p-2 shadow-lg 
                hidden md:flex items-center justify-center 
                transition-all duration-300 transform 
                hover:bg-black/90 hover:scale-105
            `   , direction === 'left' ? "left-3" : "right-3",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
            )}
            aria-label={`Scroll ${direction}`}
            disabled={!isVisible}
        >
            {direction === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
    )
}

export default Arrow
