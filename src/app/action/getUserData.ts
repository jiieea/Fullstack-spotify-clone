import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { UserDetails } from '../../../types'
import { cookies } from "next/headers"


const getUserData = async (userId : string): Promise<UserDetails | null> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    // fetch data from users table
    try {
        const {
            data: userDetails,
            error: fetchError } =
            await supabase.from('users')
                .select('*')
                .eq('id', userId)

        if (fetchError) {
            console.log(fetchError.message)
        }

        //  if userDetails exist we return
        if (userDetails && userDetails.length > 0) {
            return userDetails[0] as UserDetails 
        } else {
            console.log('no user data in this session with user id ', userId)
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