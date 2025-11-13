import { Playlist, Song } from "../../types";
import HeroSection from "./HeroSection";
interface HeroSectionProps {
    playlists : Playlist[]
    songs : Song[]
}

const DailyPlaylist = ({ playlists  , songs} : HeroSectionProps) => {
    
return(
<HeroSection playlists ={ playlists } songs={ songs }/>
    )
};

export default DailyPlaylist;