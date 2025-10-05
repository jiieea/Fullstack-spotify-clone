"use client"

import { useUsers } from '@/hooks/useUsers';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Song } from '../../types';
import { toast } from 'sonner';

interface LikedButtonProps {
    songId: string
}


const LikedButton: React.FC<LikedButtonProps> = (
    {
        songId
    }
) => {
    const [isLiked, setIsLiked] = useState(false);
    const router = useRouter();
    const supabase = useSupabaseClient();
    const { user } = useUsers()

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.id) {
                return;
            }

            try {
                const {
                    data: likedSongs,
                    error: fetchError
                } = await supabase.from('liked_songs')
                    .select('*')
                    .eq('song_id', songId)
                    .eq('user_id', user.id)
                    .single()


                if (!likedSongs && fetchError) {
                    console.error('Error fetching liked song:', fetchError);
                    return;
                }

                setIsLiked(true);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.log(e.message)
                }
            }

        }

        fetchData()

    }, [songId, supabase, user?.id]);


    // handle like song
    const handleLikeSong = async () => {
        if (isLiked) {
            const { error } = await supabase.from('liked_songs').delete()
                .eq('user_id', user?.id)
                .eq('song_id', songId)

            if (error) {
                toast.error(error.message)
            } else {
                setIsLiked(false);
                toast.success('Unliked!')
            }
        } else {
            const { error } = await supabase.from('liked_songs').insert({
                user_id: user?.id,
                song_id: songId


            })
            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success('Liked !');
            }
        }
    }

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
    return (
        <button
            type='submit'
            title='likeSong'
            onClick={handleLikeSong}
            className='cursor-pointer opacity-75 transition'>
            <Icon className='hover:scale-110'
                color={isLiked ? '#22c55e' : "white"} size={25} />
        </button>
    )
}

export default LikedButton
