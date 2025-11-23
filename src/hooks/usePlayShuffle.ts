import { useCallback, useState } from "react"
import { toast } from "sonner";


const usePlayShuffle = () => {
    const [isShuffle, setIsShuffle] = useState(false);
    // use useCallback to memoize the function , preventing unnecessary re-renders
    const handleToggleShuffle = useCallback(() => {
        setIsShuffle((prev) => !prev)
        const msg = !isShuffle ? "Shuffle Mode On" : "Shuffle Mode Off";
        toast.success(msg, { duration: 1000 })
    }, [isShuffle])

    return {
        isShuffle ,
        handleToggleShuffle
    }
}


export default usePlayShuffle;