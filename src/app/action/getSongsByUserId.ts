import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../../types";
import { cookies } from "next/headers";


const getSongByUserId = async(userId : string):Promise<Song[]> => {
    const cookiesStore= cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          return (await cookiesStore).get(name)?.value;
        },
        async set(name: string, value: string, options) {
          (await cookiesStore).set(name, value, options);
        },
       async remove(name : string, options) {
         (await cookiesStore).set(name, '', options);
       }
        },
      },
  );

    const { data  , error } = await supabase.from('songs')
    .select('*')
    .eq('user_id' , userId);


    if(error) {
        console.log(error.message)
    }

    return data as Song[] || []
}


export default getSongByUserId;