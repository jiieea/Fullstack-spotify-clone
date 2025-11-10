import { useMemo, useState  , useEffect} from "react";
import { Playlist } from "../../types";
const DAILY_PLAYLIST_STORAGE_KEY = 'daily_playlist_selection';
const useDailyPlaylist = (playlists: Playlist[]): Playlist | undefined => {
    
    // Determine today's date in YYYY-MM-DD format as the cache key
    const todayKey = useMemo(() => new Date().toISOString().slice(0, 10), []);

    // State to hold the selected playlist ID
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // Effect runs once on mount to check and set the persistent playlist
    useEffect(() => {
        // Guard clause to ensure client-side execution and data presence
        if (typeof window === 'undefined' || !playlists || playlists.length === 0) return;

        try {
            const storedData = localStorage.getItem(DAILY_PLAYLIST_STORAGE_KEY);
            let dailySelection: { date: string, playlistId: number } | null = null;

            if (storedData) {
                dailySelection = JSON.parse(storedData);
            }

            // 1. Check if we have a valid ID for today
            if (dailySelection && dailySelection.date === todayKey) {
                setSelectedId(dailySelection.playlistId);
            } else {
                // 2. If not found or if the date has changed (it's a new day), select a new random ID
                
                // Get the range of valid IDs based on your existing logic (1 to playlist.length)
                const minId = 1;
                const maxId = playlists.length;
                const newRandomNumber = Math.floor(Math.random() * (maxId - minId + 1)) + minId;

                // 3. Save the new ID and today's date
                const newDailySelection = { 
                    date: todayKey, 
                    playlistId: newRandomNumber 
                };
                localStorage.setItem(DAILY_PLAYLIST_STORAGE_KEY, JSON.stringify(newDailySelection));
                
                // 4. Update the state
                setSelectedId(newRandomNumber);
            }
        } catch (error) {
            console.error("Error accessing localStorage or parsing data:", error);
            // Fallback: If localStorage fails, randomly select for this session only
            const fallbackId = Math.floor(Math.random() * (playlists.length)) + 1;
            setSelectedId(fallbackId);
        }
    }, [playlists, todayKey]);


    // Find and return the stable playlist data based on the selectedId
    const stablePlaylist = useMemo(() => {
        if (selectedId === null) return undefined;
        
        // This is where we use the STABLE selectedId to find the playlist
        // We use .find and JSON.parse(id) to match your original logic
        return playlists.find(p => {
            try {
                // Safely parse the ID string to number for comparison
                return JSON.parse(p.id) === selectedId;
            } catch (e : unknown) {
                // Handle case where id is not a valid JSON number string
                if(e instanceof Error) {
                    console.warn(`Playlist ID ${p.id} is not a valid JSON number string.`);
                return false;
                }
            }
        });

    }, [playlists, selectedId]);

    return stablePlaylist;
};


export default useDailyPlaylist