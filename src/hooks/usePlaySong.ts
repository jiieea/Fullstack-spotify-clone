import { Icon } from "lucide-react";
import { useCallback, useState } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

const usePlayingSong = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlaying = useCallback(() => {
       setIsPlaying(prev => !prev);
        const Icon = isPlaying ? BsPauseFill : BsPlayFill ;
        return Icon
    },[isPlaying])

    return {
        isPlaying,
        Icon,
        togglePlaying
    }
}

export default usePlayingSong