import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { Song } from "../../../types";
import { cookies } from "next/headers";


const getSongsByGenre = async (genre: string): Promise<Song[] | null> => {
    const cookiesStore = cookies();

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
                async remove(name: string, options) {
                    (await cookiesStore).set(name, '', options);
                }
            },
        },
    );
    const targetPattern = `%${genre}%`;

    const {
        data,
        error
    } = await supabase.from('songs').select('*').ilike('genre', targetPattern);

    if (error) {
        console.log("failed to fetch" + error.message);
        return []
    }

    return data as Song[] | null;
}


export default getSongsByGenre;