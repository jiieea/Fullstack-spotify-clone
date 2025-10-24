import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { Song } from "../../types";
import { toast } from "sonner";


const useGetSongById = (id?: string) => {
    const [loading, setLoading] = useState(false);
    const [song, setSong] = useState<Song | undefined>(undefined)
    const supabase = useSessionContext();

    useEffect(() => {
        if (!id) {
            return;
        }

        setLoading(true);
        const fetchSong = async () => {
            const {
                data,
                error
            } = await supabase.supabaseClient.from('songs')
                .select('*').eq('id', id).single()
            if (error) {
                setLoading(false)
                toast.error(error.message)
            }

            setSong(data as Song)
            setLoading(false)

        }

        fetchSong()
    }, [loading, id, supabase.supabaseClient])

    return useMemo(() => ({
        song,
        loading
    }), [loading, song])
}



export default useGetSongById;