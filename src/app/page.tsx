import HomePage from "@/components/HomePage";
import getSong from "./action/getSong";
import getPlaylists from "./action/getPlaylists";
import getPlaylistByUserId from "./action/getPlaylistsByUserId";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import getUserData from "./action/getUserData";


export default async function Home(
) {
  const cookiesStore = cookies;
  const supabase = createServerComponentClient({
    cookies: cookiesStore
  })
  const { data } = await supabase.auth.getUser();
  const songs = await getSong()
  const playlists = await getPlaylists();
  const userId = data.user?.id;
  const [
    userPlaylists,
  ] = await Promise.all([
    getPlaylistByUserId(userId!),
    getUserData(userId!)
  ])
  return (
    <div className="w-full  2xl:h-[90vh] rounded-none md:ounded-2xl   bg-neutral-900 h-[85vh]">
      <HomePage songs={songs} playlist={playlists} userPlaylists={userPlaylists} />
    </div>
  );
}
