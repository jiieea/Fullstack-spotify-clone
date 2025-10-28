import { useEffect, useState } from "react";


const getSongDuration = (songUrl : string):Promise<number> => {
    return new Promise((resolve , reject) => {
        const audio = new Audio();
        audio.src = songUrl;


        // load the metadata
        const handleLoadMetadata = () => {
            if(isNaN(audio.duration)) {
                reject(new Error('Invalid song duration'))
            }else {
                resolve(audio.duration)
            }
            cleanUp();
        }
        const handleError = () => {
            reject(new Error('Error loading audio metadata'))
            cleanUp()
        }

        const cleanUp = () => {
            audio.removeEventListener('loadedmetadata' , handleLoadMetadata);
            audio.removeEventListener('error' , handleError);
            audio.src = ""
        }


        audio.addEventListener('loadedmetadata' , handleLoadMetadata);
        audio.addEventListener('error' , handleError)
    })
}


const formatTime = (totalSeconds : number ) : string  => {
    if(isNaN(totalSeconds)) {
        return 'N/A'
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor((totalSeconds % 60))
    const parts = []

    if(hours > 0) {
        parts.push(`${hours} h`);
    }
    if(minutes >0) {
        parts.push(`${minutes} min`)
    }
    if(seconds > 0 || parts.length === 0) {
        parts.push(`${seconds} sec`)
    }

   return  parts.join(' ')
} 



const useGetPlaylistDuration = (songUrls : string[]) : string | null => {
    const [ totalDuration , setTotalDuration ] = useState<string | null>(null);

    useEffect(() => {
        if(!songUrls || songUrls.length=== 0) {
            setTotalDuration('0:00');
            return;
        }

        const fetchDuration = async() => {
            setTotalDuration('loading...');
            try {
                const durationPromises = songUrls.map((url) => getSongDuration(url) );
                const durations = await Promise.all(durationPromises);
                 const totalSeconds = durations.reduce((sum, duration) => sum + duration, 0);
                setTotalDuration(formatTime(totalSeconds));
            }catch(error) {
                console.log('Error calculating durations' , error)
                setTotalDuration('Error')
            }
        }
        fetchDuration()
    },[songUrls])

    return totalDuration;
}


export default useGetPlaylistDuration;