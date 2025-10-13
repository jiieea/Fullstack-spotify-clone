import { useEffect, useState } from "react";


const useGetSongDuration = (songUrl: string | null): string | null => {
    const [duration, setDuration] = useState<string | null>(null)

    useEffect(() => {
        if (!songUrl) {
            setDuration(null);
            return;
        }

        const audio = new Audio();
        audio.src = songUrl;

        // load metadata
        const handleLoadMetaData = () => {
            const totalSeconds = audio.duration;

            if (isNaN(totalSeconds)) {
                setDuration('N/A')
                return;
            }

            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.floor(totalSeconds % 60);
            setDuration(`${minutes}:${seconds < 10 ? '0':""}${seconds} `)
        }

        const handleError = (e: Event) => {
            console.error('Error loading audio metadata:', e);
            setDuration('Error');
        };

        audio.addEventListener('loadedmetadata', handleLoadMetaData);
        audio.addEventListener('error', handleError);

       return  () => {
            audio.removeEventListener('loadedmetadata' , handleLoadMetaData);
            audio.removeEventListener('error' , handleError)
            audio.pause()
            audio.src = ""
        }
    } , [ songUrl ])

    return duration;
}


export default useGetSongDuration;