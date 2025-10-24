import Image from "next/image";
import { Song } from "../../types";
import { useLoadImage } from "@/hooks/useLoadImage";
import { Play } from "lucide-react";
interface DailyMixDataProps {
    song: Song,
    onHandlePlay : (id : string) => void;

}
const DailyMixCard: React.FC<DailyMixDataProps> = ({ song , onHandlePlay }) => {
    const imageSong = useLoadImage(song);
    return (
        <div className="w-48 flex-shrink-0 cursor-pointer group hover:bg-neutral-700 transition p-3 rounded-2xl">
            {/* Image/Badge Area */}
            <div 
            onClick={() => onHandlePlay(song.id)}
            className={`relative w-full aspect-square bg-gradient-to-br rounded-lg shadow-lg overflow-hidden`}>
                {/* Placeholder Image */}
                <Image
                    src={ imageSong || "https://placehold.co/192x192/181818/1db954?text=MIX"}
                    alt="Mix Cover"
                    fill
                    className="w-full h-full object-cover opacity-70"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.onerror = null; e.currentTarget.src = "https://placehold.co/192x192/181818/1db954?text=MIX" }}
                />
                {/* Badge */}
                {/* Play Button Overlay */}
                <div className="absolute right-2 bottom-2 p-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-2xl hover:scale-105">
                    <Play fill="black" className="w-5 h-5 text-black" />
                </div>
            </div>
            {/* Text Area */}
            <div className="mt-3 text-white">
                <p className="text-sm text-white truncate mt-1">{song.title}</p>
            </div>
        </div>
    )
}
export default DailyMixCard