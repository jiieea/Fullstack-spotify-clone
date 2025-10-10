import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { Button } from './ui/button'

const PlayButton = () => {
    return (
        <Button variant="ghost" className='
    bg-green-500 rounded-full opacity-0 flex items-center p-4 translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 hover:bg-green-400"'>
            <FaPlay className='text-black' />
        </Button>
    )
}

export default PlayButton