import { Playlist } from "../../types";
import HeroSection from "./HeroSection";
interface HeroSectionProps {
    playlists : Playlist[]
}

const DailyPlaylist = ({ playlists  } : HeroSectionProps) => {
    
return(
<HeroSection playlists ={ playlists }/>
    )
};

export default DailyPlaylist;