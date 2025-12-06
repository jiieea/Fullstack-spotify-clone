import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

const handleLogOut = async (supabase: SupabaseClient) => {
    try {
        const {
            error
        } = await supabase.auth.signOut();

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('logout success')
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            toast.error('failed to logout' + e.message)

        }
    }


}

export default handleLogOut;