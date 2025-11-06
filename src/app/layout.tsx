import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
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

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin']
})
export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "NextJs Spotify clone app",
};


export const revalidate = 0;
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = cookies;
  const supabase = createServerComponentClient({
    cookies : cookiesStore
  })
  const { data : userData , error : dataError } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  const likedSongs = await getLikedSongs();

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
            <ModalProviders  userData={  data!  }/>
          <Header  data = { data ?? undefined}/>
        <Sidebar
        userData={ data }
          icon={<TbPlaylist  size={30}/>}
          playlists ={ playlistUser }
          likedSongs = { likedSongs }
          >
          {children}
        </Sidebar>
        <div>
      <Player userPlaylist={playlistUser}/>
        </div>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
