"use client"
import { getRandomSongId } from "../../utils/getRandomId";
import usePlayerSong from "./usePlayer"

const usePlayBehavior = () => {
    const player = usePlayerSong();

    const onPlayNext = (shuffle: boolean) => {
        if (player.ids.length == 0) {
            return;
        }

        const currentIdx = player.ids.findIndex((id) => id === player.activeId);
        let nextSongId: string;
        if (shuffle) {
            const randomIdx = getRandomSongId(player.ids, currentIdx);
            nextSongId = player.ids[randomIdx]
        } else {
            let nextSong = player.ids[currentIdx + 1]
            if (!nextSong) {
                nextSong = player.ids[0];
            }
            nextSongId = nextSong;
        }
        player.setId(nextSongId)
    }

    const onPlayPrevious = () => {
        if (!player) {
            return;
        }

        const currentIdx = player.ids.findIndex((id) => id === player.activeId);
        const prevIndx = player.ids[currentIdx - 1];

        if (!prevIndx) {
            player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(prevIndx)
    }

    return {
        onPlayPrevious,
        onPlayNext
    };
}



export default usePlayBehavior;