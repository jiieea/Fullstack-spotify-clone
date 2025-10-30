import Image from "next/image";

import { Playlist } from "../../types";
import { useLoadPlaylistImage } from "@/hooks/useLoadImage";
import { useRouter } from 'next/navigation';

interface quickPicksDataProps {
    data: Playlist | null
}

const QuickPickCard: React.FC<quickPicksDataProps> = ({
    data
}) => {
    const image = useLoadPlaylistImage(data!);
    const router = useRouter();

    const handleClickPlaylist = () => {
        router.push(`/playlist/${data?.id}`)
    }

    if (!data) {
        return null;
    }

    return (
        <div
            onClick={handleClickPlaylist}
            className="bg-[#282828] hover:bg-[#404040] transition-colors
            duration-300 rounded-md flex items-center shadow-lg cursor-pointer
                overflow-hidden ">
            <Image
                src={image || "/assets/liked.png"}
                width={80}
                height={80}
                alt="Album Cover"
                quality={100}
                className="lg:w-[80px] lg:h-[80px] w-[60px] h-[60px] object-cover flex-shrink-0"
            />
            {/* The 'truncate' class here is key for responsiveness in flex/grid layouts */}
            <p className="text-white font-semibold text-[12px]
             md:text-sm px-4 line-clamp-2">{data.playlist_name}</p>
        </div>
    )
}

export default QuickPickCard