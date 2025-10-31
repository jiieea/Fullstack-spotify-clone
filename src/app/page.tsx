import HomePage from "@/components/HomePage";
import getSong from "./action/getSong";
import getPlaylists from "./action/getPlaylists";
import getPlaylistByUserId from "./action/getPlaylistsByUserId";
export default async function Home() {
  const songs = await getSong()
  const playlists = await getPlaylists();
  const userPlaylists =await getPlaylistByUserId();
  return ( 
    <div className="w-full  2xl:h-[90vh] rounded-none md:ounded-2xl   bg-neutral-900 h-[85vh]">
      <HomePage  songs={ songs } playlist={ playlists } userPlaylists={ userPlaylists } />
    </div>
  );
}
