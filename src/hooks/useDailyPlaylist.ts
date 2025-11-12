// src/hooks/useDailyPlaylist.ts

import { useMemo, useState, useEffect } from "react"; // <-- Import useEffect
import { Playlist } from "../../types";

const useDailyPlaylist = (playlists: Playlist[]): Playlist | null => { // Changed type to Playlist[]
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // 1. Use useEffect to set the random ID only once on mount
    useEffect(() => {
        if (playlists.length > 0) {
            // get random number from 1 to playlists length (assuming IDs start at 1 and are sequential)
            const minId = 1;
            const maxId = playlists.length;
            const randomNum = Math.floor(Math.random() * (maxId - minId + 1) + minId);
            setSelectedId(randomNum);
        }
    }, [playlists.length]); // Re-run if the playlist count changes

    // 2. The useMemo is correct for calculating the playlist
    const chosenPlaylist = useMemo(() => {
        if (selectedId === null) return null;

        return playlists.find((playlist) => {
            try {
                return JSON.parse(playlist.id) === selectedId; 
            } catch {
                console.warn(`Could not parse playlist id ${playlist.id}.`);
                return false; 
            }
        });
    }, [playlists, selectedId]);

    // 3. Cast the return value for better type safety
    return chosenPlaylist ?? null;
}

export default useDailyPlaylist;