import { SupabaseClient } from "@supabase/auth-helpers-react"
import { toast } from "sonner";


const deletePlaylist = async (playlistId: string, supabase: SupabaseClient , onSuccess : () => void) => {
    try {
        const {
            data,
            error
        } = await supabase.from('playlist').delete().eq('id', playlistId);

        if(error) {
            toast.error(error.message);
            return;
        }

        if(data) {
            toast.success('playlist removed');
        }

        if(onSuccess) {
            onSuccess()
        }
    }catch {
        toast.error("failed to remove the playlist");
        
    }
}


export default deletePlaylist;