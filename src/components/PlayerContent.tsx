"use client"

import React, { CSSProperties, useEffect, useMemo, useState } from 'react'
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
import { PiShuffleBold } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'
import { usePlayerContext } from '@/providers/PlayerProviders'
import { getRandomSongId } from '../../utils/getRandomId'
import { formatTime } from '../../utils/formatTime'
/**
 * PlayerContent Component
 * 
 * A comprehensive music player component that provides full playback controls
 * and audio management functionality for a Spotify-like music application.
 * 
 * @component
 * @example
 * ```tsx
 * <PlayerContent 
 *   song={currentSong} 
 *   songUrl="/api/songs/123.mp3"
 *   userPlaylists={playlists}
 * />
 * ```
 * 
 * @features
 * - **Playback Controls**: Play, pause, next, previous song navigation
 * - **Shuffle Mode**: Random song selection with visual indicator
 * - **Volume Control**: Volume slider with mute/unmute toggle
 * - **Progress Tracking**: Real-time progress bar with seek functionality
 * - **Time Display**: Current time and total duration formatting
 * - **Auto-advance**: Automatically plays next song when current ends
 * - **Responsive Design**: Different layouts for mobile and desktop
 * 
 * @props
 * - `song`: The currently playing song object
 * - `songUrl`: URL path to the audio file (MP3 format)
 * - `userPlaylists`: Array of user's playlists for adding songs
 * 
 * @state
 * - `volume`: Volume level (0-1), default 0.5
 * - `isPlaying`: Boolean indicating if song is currently playing
 * - `currentTime`: Current playback position in seconds
 * - `duration`: Total song duration in seconds
 * 
 * @behavior
 * - Automatically plays song when `songUrl` changes
 * - Updates current time every 500ms while playing
 * - Handles shuffle mode: random selection avoiding current song
 * - Handles sequential mode: loops to first song when reaching end
 * - Previous button loops to last song when at beginning
 * - Volume changes are applied in real-time to the audio
 * - Progress bar allows seeking to any position in the song
 * 
 * @dependencies
 * - `use-sound`: Audio playback library (Howler.js wrapper)
 * - `usePlayerSong`: Custom hook for player state management
 * - `usePlayShuffle`: Custom hook for shuffle mode state
 * 
 * @layout
 * - **Desktop (md+)**: 3-column grid with full controls
 *   - Column 1: Song info, like button, playlist button
 *   - Column 2: Playback controls, progress bar, time display
 *   - Column 3: Volume controls
 * - **Mobile**: 2-column grid with simplified controls
 *   - Column 1: Song info, like button, playlist button
 *   - Column 2: Play/pause button only
 * 
 * @audio
 * - Supports MP3 format only
 * - Uses Howler.js for audio processing
 * - Handles audio cleanup on unmount
 * - Volume range: 0 (muted) to 1 (max)
 */
export const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl,
    userPlaylists
}) => {
    const { isShuffle, handleToggleShuffle , isPlaying , setIsPlaying } = usePlayerContext();
    const player = usePlayerSong();
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0)
    const VolumeIcon = volume === 0 ? FaVolumeXmark : FaVolumeLow;
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;

    /**
     * Helper function to get a random song ID that is different from the current song
     * @param songIds - Array of all available song IDs
     * @param currentIdx - Index of the currently playing song
     * @returns Random index that is not the current index
     * @note If only one song exists, returns 0 to loop the same song
     */


    /**
     * Plays the next song in the queue
     * Supports both shuffle and sequential modes
     * Automatically loops to the first song when reaching the end
     */
    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        if (pause) {
            pause();
        }

        const currentIdx = player.ids.findIndex((id) => id == player.activeId);
        let nextSongId: string;
        if (isShuffle) {
            const randomIndx = getRandomSongId(player.ids, currentIdx);
            nextSongId = player.ids[randomIndx];
        } else {
            let nextSong = player.ids[currentIdx + 1];
            if (!nextSong) {
                nextSong = player.ids[0];
            }
            nextSongId = nextSong;
        }
        player.setId(nextSongId)
    }

    /**
     * Plays the previous song in the queue
     * Automatically loops to the last song when at the beginning
     */
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
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3']
    }
    )

    /**
     * Effect: Automatically plays the sound when it's loaded
     * Cleans up by unloading the sound when component unmounts or sound changes
     */
    useEffect(() => {
        sound?.play();
        return () => {
            sound?.unload()
        }

    }, [sound])

    /**
     * Effect: Updates the sound volume when volume state changes
     */
    useEffect(() => {
        if (sound) {
            sound.volume(volume)
        }
    }, [sound, volume])


    /**
     * Toggles play/pause state of the current song
     */
    const handlePlayingMusic = () => {
        if (!isPlaying) {
            play()
        } else {
            pause()
        }
    }

    /**
     * Toggles volume between muted (0) and full volume (1)
     */
    const handleSetVolume = () => {
        if (volume === 0) {
            setVolume(1)
        } else {
            setVolume(0);
        }
    }


    /**
     * Effect: Sets the song duration once the sound is loaded and ready
     * Uses a small delay to ensure Howler.js has the duration available
     */
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

    /**
     * Effect: Updates currentTime every 500ms while the song is playing
     * Clears the interval when paused or when sound changes
     */
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

    /**
     * Handles seeking to a specific position in the song
     * @param event - Change event from the progress bar input
     */
    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(event.target.value);
        setCurrentTime(newTime); // Update state for instant visual feedback
        if (sound) {
            sound.seek(newTime); // Tell Howler.js to jump to the new time
        }
    }

    /**
     * Calculates the progress percentage for the progress bar
     * Returns 0 if duration is not available
     */
    const progressPercent = useMemo(() => {
        if (duration > 0) {
            return (currentTime / duration) * 100;
        }

        return 0;
    }, [duration, currentTime]);


    return (
        <div className="
        grid grid-cols-2 md:grid-cols-3 h-full ">
            <div className="flex w-full rounded-md 
             justify-start md:bg-black">
                <div className="flex items-center gap-x-4   ">
                    < PlayerMedia data={song} />
                    <LikedButton songId={song.id} />
                    <PlaylistButton songId={song.id}
                        playlists={userPlaylists} />
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
                      mr-4
                      cursor-pointer
                      "
                >
                    <Icon size={35} className="text-white" />
                </div>
            </div>
            <div className='flex flex-col items-center gap-y-2.5'>
                <div
                    className="hidden w-full md:flex justify-center items-center 
                 h-full max-w-[722px] gap-x-6 mt-1"
                >
                    {/* shuffle songs icon */}
                    <PiShuffleBold
                        onClick={handleToggleShuffle}
                        size={30} className={twMerge(
                            `text-neutral-700 cursor-pointer`, isShuffle && "text-green-500 transition"
                        )} />
                    <AiFillStepBackward onClick={onPlayPrevious}
                        className="text-neutral-400 cursor-pointer hover:text-white transition" size={30} />
                    <div onClick={handlePlayingMusic} className="flex items-center justify-center h-8 w-8 rounded-full bg-white p-1 cursor-pointer">
                        <Icon size={30} className="text-black " />
                    </div>
                    <AiFillStepForward size={30} className="text-neutral-400 cursor-pointer hover:text-white transition"
                        onClick={onPlayNext} />
                </div>
                <div className="flex items-center w-full gap-x-2 mb-2 px-4">
                    <span className="text-xs text-neutral-400 w-8 text-right hidden md:block">
                        {formatTime(currentTime)}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        disabled={duration === 0}
                        aria-label="Seek song progress"
                        className="w-full spotify-progress-bar rounded-lg appearance-none cursor-pointer hidden md:block "
                        style={{ '--progress-percent': `${progressPercent}%` } as CSSProperties}
                    />
                    <span className="text-xs text-neutral-400 w-8 text-left hidden md:block">
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