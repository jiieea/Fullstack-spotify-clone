"use client"

import React, { useEffect, useState } from 'react'
import LikedButton from './LikedButton'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import useSound from 'use-sound'
import {PlayerContentProps} from '../app/interfaces/types'
import PlaylistButton from './PlaylistButton'
import usePlayerSong from '@/hooks/usePlayer'
import SliderVolume from './SliderVol'
import PlayerMedia from './PlayerMedia'

export const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl,
    userPlaylists
}) => {
    const player = usePlayerSong();
    const [volume, setVolume] = useState(0.5);
    const [isPlaying, setIsPlaying] = useState(false);
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? FaVolumeXmark : FaVolumeLow;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIdx = player.ids.findIndex((id) => id == player.activeId);
        const nextSong = player.ids[currentIdx + 1];

        // play the first song if next song isnot exist 
        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (!player) {
            return;
        }

        const currentSong = player.ids.findIndex((id) => id == player.activeId);
        const prevSong = player.ids[currentSong - 1];

        if (!prevSong) {
            player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(prevSong)
    }


    const [play, { sound, pause }] = useSound(
        songUrl, {
        volume: volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false)
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3']
    }
    )

    useEffect(() => {
        sound?.play();
        return () => {
            sound?.unload()
        }

    }, [sound])

    useEffect(() => {
        if (sound) {
            sound.volume(volume)
        }
    }, [sound, volume])


    const handlePlayingMusic = () => {
        if (!isPlaying) {
            play()
        } else {
            pause()
        }
    }


    const handleSetVolume = () => {
        if (volume === 0) {
            setVolume(1)
        } else {
            setVolume(0);
        }
    }

    return (
        <div className="
        grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full rounded-md
             justify-start md:bg-black">
                <div className="flex items-center gap-x-4">
                    < PlayerMedia data={song} />
                    <LikedButton songId={song.id} />
                    <PlaylistButton songId={song.id} playlists={userPlaylists} />
                </div>
            </div>
            <div className="
              md:hidden 
              col-auto
              w-full 
              flex 
              justify-end 
              items-center
              gap-x-2
              "
            >
                <div
                    onClick={handlePlayingMusic}
                    className="
                      h-10 
                      w-10 
                      flex 
                      items-center 
                      justify-center 
                      rounded-full 
                      p-1 
                      cursor-pointer
                      "
                >
                    <Icon size={35} className="text-white" />
                </div>
            </div>
            <div
                className="hidden w-full md:flex justify-center items-center 
                 h-full max-w-[722px] gap-x-6"
            >
                <AiFillStepBackward onClick={onPlayPrevious}
                    className="text-neutral-400 cursor-pointer hover:text-white transition" size={30} />
                <div onClick={handlePlayingMusic} className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
                    <Icon size={30} className="text-black " />
                </div>
                <AiFillStepForward size={30} className="text-neutral-400 cursor-pointer hover:text-white transition"
                    onClick={onPlayNext} />
            </div>
            <div className="hidden md:flex justify-end pr-2 w-full">
                <div className="flex items-center w-[120px] gap-x-2">
                    <VolumeIcon onClick={handleSetVolume} className="cursor-pointer text-white" size={25} />
                    <SliderVolume value={volume} onChange={(volume) => setVolume(volume)} />
                </div>
            </div>
        </div>
    )
}