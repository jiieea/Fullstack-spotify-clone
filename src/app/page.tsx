// app/page.tsx (or .js)

import HomePage from "@/components/HomePage";
import getSong from "./action/getSong";
import getPlaylists from "./action/getPlaylists";
import getPlaylistByUserId from "./action/getPlaylistsByUserId";
import getUserData from "./action/getUserData";

// ⚠️ CHANGE 1: Import the new utility from @supabase/ssr
import { createServerClient } from "@supabase/ssr";

// ⚠️ CHANGE 2: We no longer need to import the old auth-helpers package
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"; // <--- DELETE THIS LINE

import { cookies } from "next/headers"; // Keep this, as it's required

export default async function Home() {
  const cookiesStore = cookies(); // ⚠️ FIX: cookies is a function, not a variable

  // ⚠️ CHANGE 3: Initialize Supabase client using the new function
  // It requires the URL and Anon Key from your environment variables
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

  // Now, the rest of your logic can stay the same:
  const { data } = await supabase.auth.getUser();
  const songs = await getSong();
  const playlists = await getPlaylists();
  const userId = data.user?.id;
  
  // The use of Promise.all is great for performance!
  const [userPlaylists] = await Promise.all([
    getPlaylistByUserId(userId!),
    getUserData(userId!), // Ensure getUserData is awaited if needed, but it's not being assigned here.
  ]);

  return (
    <div className="w-full 2xl:h-[90vh] rounded-none md:ounded-2xl bg-neutral-900 h-[80vh]">
      <HomePage
        songs={songs}
        playlist={playlists}
        userPlaylists={userPlaylists}
      />
    </div>
  );
}