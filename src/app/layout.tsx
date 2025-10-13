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
  const userData = await getUserData();
  const likedSongs = await getLikedSongs();
  const userPlaylists = await getPlaylistByUserId();
  return (
    <html lang="en">
       <link rel="icon" href="/assets/soundwave.png" />
      <body
        className={`${montserrat.className} antialiased bg-black `}
      >
        <SupabaseProvider >
          <UserProvider>
            <ModalProviders  userData={  userData ?? undefined }/>
          <Header  data = { userData ?? undefined}/>
        <Sidebar
        userData={ userData }
          icon={<TbPlaylist  size={30}/>}
          playlists ={ userPlaylists }
          likedSongs = { likedSongs }
          >
          {children}
        </Sidebar>
        <div>
          {/* <h1 className="text-white">This is where player container at</h1> */}
        </div>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
