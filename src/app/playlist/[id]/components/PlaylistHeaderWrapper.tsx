"use client";

import { useRef, useEffect, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
interface PlaylistWrapperProps {
  bgColor: string;
  children: ReactNode;
  className ?: string
}

const PlaylistWrapper: React.FC<PlaylistWrapperProps> =
  ({ bgColor,
    children,
    className
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
        className={twMerge(
          `py-15 px-6 flex items-center gap-x-9 h-full
                 flex-col md:flex-row md:items-start bg-gradient-to-b
                 from-[var(--playlist-color)] to-neutral-900/80 transition-colors duration-500
                 md:text-start justify-center text-center md:justify-start` , className
        )}
      >
        {children}
      </div>
    );
  };

export default PlaylistWrapper;