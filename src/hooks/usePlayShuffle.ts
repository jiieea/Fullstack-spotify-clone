import { useSearch } from "@/providers/SearchProviders"
import { toast } from "sonner";


const usePlayShuffle = () => {
    const { isShuffle, setIsShuffle } = useSearch();
    try {
        setIsShuffle(!isShuffle);
        const msg = isShuffle ? "Incative" : "Active"
        toast.success(`Shuffle mode ${msg}}`)
    }catch(e : unknown) {
        if(e instanceof Error ){
            toast.error(e.message)
        }
    }

}

export default usePlayShuffle;