// // src/hooks/useDailyPlaylist.ts
import { useMemo } from "react";
import { Playlist } from "../../types";

//  get seed based on current date
const getSeedDate = () => {
    const date = new Date();
    const timeFormat = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
    return parseInt(timeFormat, 10)
}

// /**
//  * Generates a deterministic random number between min and max (inclusive)
//  * using a seed value
//  */

const seededRandom = (seed: number, min: number, max: number): number => {
    //  we use 9301 and 49297 in this case  , these are the prime number that improve distiribution
    const multiplier = 9301;
    const increment = 49297;
    const hash = seed * multiplier + increment;
    return min + (hash % (max - min + 1));
}

const useDailyPlaylist = (playlists: Playlist[]): Playlist | null => {
    const chosenPlaylist = useMemo(() => {
        if(playlists.length === 0 || !playlists)  return null

        const date = getSeedDate();
        const minIndex = 0;
        const maxIndex = playlists.length - 1;
        const randomIndex = seededRandom(date , minIndex , maxIndex);
        
        // Select playlist by array index (0-based)
        return playlists[randomIndex] ?? null
},[playlists])
    return chosenPlaylist;
}


export default useDailyPlaylist;