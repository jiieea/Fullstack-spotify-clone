import Image from "next/image";

import { Playlist } from "../../types";
import { useLoadPlaylistImage } from "@/hooks/useLoadImage";

interface quickPicksDataProps {
    data: Playlist | null
}

const QuickPickCard: React.FC<quickPicksDataProps> = ({
    data
}) => {
        const image = useLoadPlaylistImage(data!); 
    // FIX: Add a conditional return if data is null to avoid calling the hook with null
    if (!data) {
        return null; 
    }
    
    // Non-null assertion (!) is now safe because of the check above.


    return (
        <div className="bg-[#282828] hover:bg-[#404040] transition-colors duration-300 rounded-md flex items-center shadow-lg cursor-pointer overflow-hidden">
            <Image
                src={image || "/assets/liked.png"}
                width={60}
                height={60}
                alt="Album Cover"
                // FIX: Add the 'quality' prop and set it to 100 for maximum quality.
                quality={100}
                className="w-15 h-15 object-cover flex-shrink-0"
            />
            {/* Safe access using optional chaining */}
            <span className="text-white font-semibold text-sm px-4 truncate">{data.playlist_name}</span>
        </div>
    )
}

export default QuickPickCard