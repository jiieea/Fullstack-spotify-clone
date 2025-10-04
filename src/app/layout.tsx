import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { ModalProviders } from "@/providers/ModalProviders";
import { UserProvider } from "@/providers/UserProvider";
import getSong from "./action/getSong";
import getUserData from "./action/getUserData";
import { TbPlaylist } from 'react-icons/tb'


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
  const songs = await getSong();
  const userData = await getUserData();

  return (
    <html lang="en">
       <link rel="icon" href="/assets/icon.png" />
      <body
        className={`${montserrat.className} antialiased bg-black`}
      >
        <SupabaseProvider>
          <UserProvider>
            <ModalProviders  userData={  userData ?? undefined }/>
          <Header  data = { userData ?? undefined}/>
        <Sidebar
          icon={<TbPlaylist  size={30}/>}
          songs ={ songs }
          >
          {children}
        </Sidebar>
        <div>
          <h1 className="text-white">This is where player container at</h1>
        </div>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
