import type { Metadata } from "next";
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
import getSong from "./action/getSong";
import Header from "@/components/Header";
import { Metrophobic } from 'next/font/google';
import PlayerProviders from "@/providers/PlayerProviders";
import getPlaylists from "./action/getPlaylists";

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "NextJs Spotify clone app",
};

const metrophobic = Metrophobic({
  weight: "400",
  variable: "--font-metrophobic",
  subsets: ['latin']
})
interface RooteLayoutProps {
  children: React.ReactNode;
}
export const revalidate = 0;
export default async function RootLayout({
  children,
}: RooteLayoutProps) {
  const cookiesStore = cookies;
  const supabase = createServerComponentClient({
    cookies: cookiesStore
  })
  const { data: userData, error: dataError } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  const songs = await getSong()
  if (!userData.user || dataError) {
    <div>Login oi</div>
  }
  const [
    data,
    playlistUser,
    likedSongs,
    playlists
  ] = await Promise.all([
    getUserData(userId!),
    getPlaylistByUserId(userId!),
    getLikedSongs(userId!),
    getPlaylists()
  ]

  )
  return (
    <html lang="en">
      <link rel="icon" href="/assets/soundwave.png" />
      <body
        className={` antialiased bg-black ${metrophobic.className}`}
      >
        <SupabaseProvider >
          <UserProvider>
            <SearchProvider>
              <PlayerProviders>
                <ModalProviders userData={data!} />
                <Header data={data!}
                  searchSongs={songs}
                  playlists={playlists}
                />
                <Sidebar
                  userData={data}
                  icon={<TbPlaylist size={30} />}
                  playlists={playlistUser}
                  likedSongs={likedSongs}
                >
                  {children}
                </Sidebar>
                <div>
                  <Player userPlaylist={playlistUser} />
                </div>
              </PlayerProviders>
            </SearchProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
