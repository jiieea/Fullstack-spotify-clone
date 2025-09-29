import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import Header from "@/components/Header";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { MdQueueMusic } from "react-icons/md";
import { ModalProviders } from "@/providers/ModalProviders";
import { UserProvider } from "@/providers/UserProvider";
import getSong from "./action/getSong";

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
  return (
    <html lang="en">
       <link rel="icon" href="/icon.png" />
      <body
        className={`${montserrat.className} antialiased bg-black`}
      >
        <SupabaseProvider>
          <UserProvider>
            <ModalProviders />
            <Header  />
        <Sidebar
          icon={<MdQueueMusic  size={30}/>}
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
