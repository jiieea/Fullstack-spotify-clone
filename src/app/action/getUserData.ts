import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { UserDetails } from '../../../types'
import { cookies } from "next/headers"


const getUserData = async (): Promise<UserDetails | null> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.log('error getting data sesson', error.message)
        return null;
    }

    if (!data.user.id) {
        console.log("no user id found in session data");
        return null;
    }

    // fetch data from users table
    try {
        const {
            data: userDetails,
            error: fetchError } =
            await supabase.from('users')
                .select('*')
                .eq('id', data.user.id)

        if (fetchError) {
            console.log(fetchError.message)
        }

        //  if userDetails exist we return
        if (userDetails && userDetails.length > 0) {
            return userDetails[0] as UserDetails 
        } else {
            console.log('no user data in this session with user id ', data.user.id)
            return null
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(e.message)
        }
    }
    return null
}

export default getUserData