"use client"
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


interface PlayerProvidersProps {
    isPlaying : boolean
    setIsPlaying  : Dispatch<SetStateAction<boolean>>
}

const PlayerContext = createContext<PlayerProvidersProps | undefined>(undefined)
const PlayerProviders : React.FC<{ children : React.ReactNode}> = ({
    children
}) => {
    const [ isPlaying , setIsPlaying ] = useState(false)
    const playerContext = {
        isPlaying,
        setIsPlaying
    }
    return (
        <PlayerContext.Provider value={ playerContext }>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    if(context == undefined) {
        throw new Error('usePlayerContext must be use inside PlayerProviders')
    }
    return context;
}





export default PlayerProviders