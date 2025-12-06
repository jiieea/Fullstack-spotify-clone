"use client"
import React, {
    createContext,
    useContext,
    useState
} from "react";
import { toast } from "sonner";

import { PlayerProvidersProps } from '../app/interfaces/types'


const PlayerContext = createContext<PlayerProvidersProps | undefined>(undefined)
const PlayerProviders: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isShuffle, setIsShuffle] = useState(false);

    // toggle shuffle
    const handleToggleShuffle = () => {
        setIsShuffle((prev) => !prev);
        const msg = !isShuffle ? "Shuffle Mode On" : "Shuffle Mode Off";
        toast.success(`${msg}`)
    }
    const playerContext = {
        isPlaying,
        setIsPlaying,
        isShuffle,
        setIsShuffle,
        handleToggleShuffle
    }
    return (
        <PlayerContext.Provider value={playerContext}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    if (context == undefined) {
        throw new Error('usePlayerContext must be use inside PlayerProviders')
    }
    return context;
}





export default PlayerProviders