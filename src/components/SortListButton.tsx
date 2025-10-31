import React, { useState } from 'react';
import { FaList } from 'react-icons/fa'; // Assuming FaList is from react-icons

interface SortDropdownProps {
    sort: string;
    onHandleSortByTitle: () => void;
    onHandleSortByArtist: () => void;
    onHandleSortByRecentlyAdd: () => void;
}

const SortDropdown = ({ sort, onHandleSortByArtist, onHandleSortByRecentlyAdd, onHandleSortByTitle }: SortDropdownProps) => {
    // State to control the visibility of the dropdown
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the dropdown visibility
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Function to handle the click and close the dropdown
    const handleClick = (handler: () => void) => {
        handler(); // Call the sorting function passed via props
        setIsOpen(false); // Close the dropdown after selection
    };

    // Define the sorting options with their corresponding handler
    const sortOptions = [
        { label: 'By Title', handler: onHandleSortByTitle },
        { label: 'By Artist', handler: onHandleSortByArtist },
        { label: 'Recently Add', handler: onHandleSortByRecentlyAdd },
    ];

    return (
        // The main container needs 'relative' for the dropdown to be positioned correctly
        <div className='relative inline-block text-left z-50 '>

            {/* 1. The Button/Trigger */}
            <div
                className='flex gap-x-2 items-center text-neutral-600 hover:text-neutral-200 transition cursor-pointer'
                onClick={toggleDropdown} // Add the click handler here
            >
                <span>Sort the songs</span>
                <FaList size={20} />
            </div>

            {/* 2. The Dropdown List */}
            {isOpen && (
                <div
                    className='absolute right-0 mt-2 w-48 rounded-md shadow-lg 
                    bg-neutral-800 ring-1 ring-black ring-opacity-5 z-10' // neutral-800 background
                >
                    <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                        {sortOptions.map((option) => (
                            <button // Use a <button> instead of <a> when no external link is involved
                                key={option.label}
                                // Attach the click handler
                                onClick={() => handleClick(option.handler)}
                                className={`block w-full text-left px-4 py-2 text-sm transition
                                    ${sort === option.label
                                        ? 'bg-neutral-700 text-white font-bold' // Highlight current selection
                                        : 'text-white hover:bg-neutral-700' // Normal state
                                    }`}
                                role='menuitem'
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SortDropdown;