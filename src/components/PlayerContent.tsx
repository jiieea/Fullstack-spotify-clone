"use client"

import React, { useEffect, useMemo, useState } from 'react'
import LikedButton from './LikedButton'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import useSound from 'use-sound'
import { PlayerContentProps } from '../app/interfaces/types'
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
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0)
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? FaVolumeXmark : FaVolumeLow;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        if (pause) {
            pause();
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
        interrupt: true,
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

    const formatTime = (seconds: number): string => {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
        return `${minutes}:${formattedSecs}`;
    };


    const handleSetVolume = () => {
        if (volume === 0) {
            setVolume(1)
        } else {
            setVolume(0);
        }
    }

    useEffect(() => {
        if (sound) {
            const checkDuration = setTimeout(() => {
                if (sound.duration() > 0) {
                    setDuration(sound.duration())
                }
            }, 100)
            return () => clearTimeout(checkDuration)
        }

    }, [sound])

    // ... inside PlayerContent component

    // Effect to set the duration once the sound is ready
    useEffect(() => {
        if (sound) {
            // Howler.js needs a short delay/check for duration to be available
            const checkDuration = setTimeout(() => {
                if (sound.duration() > 0) {
                    setDuration(sound.duration());
                }
            }, 100);

            return () => clearTimeout(checkDuration);
        }
    }, [sound]);

    // Effect to update currentTime while the song is playing
    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;

        if (isPlaying && sound) {
            // Start interval to update time every 500ms
            intervalId = setInterval(() => {
                const seekTime = sound.seek();
                if (typeof seekTime === 'number') {
                    setCurrentTime(seekTime);
                }
            }, 500);
        } else {
            // Clear the interval when paused or not playing
            if (intervalId) {
                clearInterval(intervalId);
            }
        }

        // Cleanup function to clear the interval
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isPlaying, sound]);

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(event.target.value);
        setCurrentTime(newTime); // Update state for instant visual feedback
        if (sound) {
            sound.seek(newTime); // Tell Howler.js to jump to the new time
        }
    }
    // Calculate the percentage for custom slider styling if needed
    const progressPercent = useMemo(() => {
        if (duration > 0) {
            return (currentTime / duration) * 100;
        }
        return 0;
    }, [currentTime, duration]);
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
            <div className='flex flex-col items-center'>
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
                <div className="flex items-center w-full gap-x-2 mt-1 px-4">
                    <span className="text-xs text-neutral-400 w-8 text-right">
                        {formatTime(currentTime)}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        disabled={duration === 0} // Disable if song hasn't loaded
                        className="w-full h-1 bg-neutral-600 rounded-lg appearance-none cursor-pointer"
                        // Custom styling for a Spotify-like progress bar (requires custom CSS/Tailwind configuration)
                        // If you use a custom slider component, use that instead.
                        style={{
                            '--tw-range-thumb-color': 'white',
                            '--tw-range-track-color': 'rgb(75 85 99)', // Neutral-600
                            '--tw-range-progress-color': 'rgb(29 185 84)', // Spotify green
                        }}
                    />
                    <span className="text-xs text-neutral-400 w-8 text-left">
                        {formatTime(duration)}
                    </span>
                </div>
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