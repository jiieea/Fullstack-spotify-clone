import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { ModalProviders } from "@/providers/ModalProviders";
import { UserProvider } from "@/providers/UserProvider";
import getUserData from "./action/getUserData";
import { TbPlaylist } from 'react-icons/tb'
import getLikedSongs from "./action/getLikedSongs";
import getPlaylistByUserId from "./action/getPlaylistsByUserId";
import { Player } from "@/components/Player";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SearchProvider from "@/providers/SearchProviders";
import getSongsByTitle from "./action/getSongsByTitle";
import getSong from "./action/getSong";


const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin']
})
export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "NextJs Spotify clone app",
};

interface RooteLayouProps {
  children: React.ReactNode;
}

export const revalidate = 0;
export default async function RootLayout({
  children,
} : RooteLayouProps) {
  const cookiesStore = cookies;
  const supabase = createServerComponentClient({
    cookies : cookiesStore
  })
  const { data : userData , error : dataError } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  const likedSongs = await getLikedSongs();
  const songs = await getSong()
  if(!userData.user || dataError) {
    <div>Login oi</div>
  }
  const [
    data ,
    playlistUser
  ] = await Promise.all([
    getUserData(userId!),
    getPlaylistByUserId(userId!)
  ]
  )
  return (
    <html lang="en">
       <link rel="icon" href="/assets/soundwave.png" />
      <body
        className={`${montserrat.className} antialiased bg-black `}
      >
        <SupabaseProvider >
          <UserProvider>
            <SearchProvider>
              <ModalProviders  userData={  data!  }/>
        <Sidebar
        userData={ data }
          icon={<TbPlaylist  size={30}/>}
          playlists ={ playlistUser }
          likedSongs = { likedSongs }
          songs = { songs }
          >
          {children}
        </Sidebar>
        <div>
      <Player userPlaylist={playlistUser}/>
        </div>
            </SearchProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
