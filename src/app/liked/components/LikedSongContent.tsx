import React from 'react'
import { CiClock2 } from "react-icons/ci";

interface LikedSongContentProps {
  children: React.ReactNode
}
const LikedSongContent: React.FC<LikedSongContentProps> = (
  {
    children
  }
) => {
  return (
    <div className='mt-5 py-3 px-6'>
      <div className="grid grid-cols-9 items-center text-neutral-400 uppercase text-xs font-semibold py-2 border-b border-neutral-700 sticky top-0 bg-neutral-900/90 backdrop-blur-sm z-10">
        <div className="col-span-5 pl-4 flex gap-x-8"><span >
          #
        </span>
          <span>Title</span>
        </div>
        <div className="col-span-3"> Created At</div> {/* CHANGED: span remains 3 */}
        <div className="col-span-1 justify-center ">
          {/* Clock Icon (Placeholder for the actual icon from the image) */}
          <CiClock2 size={20} className='text-white col-span-1' />
        </div>
      </div>
      {children}
    </div>
  )
}

export default LikedSongContent
