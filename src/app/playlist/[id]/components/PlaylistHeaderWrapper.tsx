"use client";

import { useRef, useEffect, ReactNode } from 'react';

interface PlaylistWrapperProps {
  bgColor: string;
  children: ReactNode;
}

const PlaylistWrapper: React.FC<PlaylistWrapperProps> =
  ({ bgColor,
    children
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (containerRef.current && bgColor) {
        containerRef.current.style.setProperty('--playlist-color', bgColor);
      }
    }, [bgColor]);

    return (
      <div
        ref={containerRef}
        className='py-15 px-6 flex items-center gap-x-9 h-full
                 flex-col md:flex-row md:items-start bg-gradient-to-b
                 from-[var(--playlist-color)] to-neutral-900
                 md:text-start justify-center text-center md:justify-start'
      >
        {children}
      </div>
    );
  };

export default PlaylistWrapper;