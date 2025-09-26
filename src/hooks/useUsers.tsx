/**
 * @fileoverview This file contains two React hooks for managing user and playlist data with Supabase.
 * It's designed to be used in a Next.js application with Supabase authentication helpers.
 *
 * @remark This component is marked with `"use client"` directive, meaning it's a Client Component
 * in Next.js.
 */
"use client"

import { User } from '@supabase/auth-helpers-nextjs';
import { Playlist, UserDetails } from '../../types';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react';

/**
 * @typedef {Object} UserContextType
 * @property {string | null} accessToken - The Supabase session access token.
 * @property {User | null} user - The Supabase user object.
 * @property {UserDetails | null} userDetails - A custom UserDetails object fetched from the 'users' table.
 * @property {boolean} isLoading - A boolean indicating if user or data is currently being loaded.
 * @property {Playlist | null} playlist - A single playlist object, likely for a specific view or purpose.
 * @property {Playlist[]} playlists - An array of all playlists belonging to the user.
 */
type UserContextType = {
    accessToken: string | null,
    user: User | null,
    userDetails: UserDetails | null,
    isLoading: boolean,
    playlist: Playlist | null
    playlists: Playlist[]
}

/**
 * @description React Context for providing user and playlist data throughout the application.
 * @type {React.Context<UserContextType | undefined>}
 */
export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

/**
 * @description Defines the props interface for the MyUserContextProvider component.
 * @interface Props
 * @property {any} [propName: string] - All other standard React props passed to the provider.
 */
export interface Props {
    [propName: string]: unknown;
}

/**
 * @description A React Context Provider component that fetches and manages Supabase user data,
 * user details, and playlists. It makes this data available to all child components via the UserContext.
 *
 * @component
 * @param {Props} props - The component's props.
 * @returns {React.ReactNode} The UserContext.Provider with the user and playlist data.
 */
export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();

    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    /**
     * @description Memoized function to fetch user details from the 'users' table.
     * @function
     * @returns {Promise<any>} A Supabase query promise for a single user record.
     */
    const getUserDetails = useCallback(() => supabase.from('users').select('*').single(), [supabase]);

    /**
     * @description Memoized function to fetch a single playlist belonging to the current user.
     * @function
     * @returns {Promise<any>} A Supabase query promise for a single playlist record.
     */
    const getPlaylists = useCallback(() => supabase.from('playlist')
        .select('*').eq('user_id', session?.user.id)
        .single(), [supabase, session])

    /**
     * @description Memoized function to fetch details for a specific playlist.
     * @function
     * @returns {Promise<any>} A Supabase query promise for a specific playlist record.
     */
    const getPlaylistDetail = useCallback(() =>
        supabase.from('playlist').
            select('*')
            .eq('playlistId ', playlist?.id)
            .single(),
        [supabase, playlist?.id])

    /**
     * @description An effect hook that triggers data fetching when the user state changes.
     * It fetches user details and playlists concurrently using `Promise.allSettled`.
     * It handles loading states and updates the context state with the fetched data.
     *
     * @listens user - Triggered when the Supabase user object changes.
     * @listens isLoadingUser - Triggered when the user loading status changes.
     * @listens isLoadingData - Triggered when the internal data loading status changes.
     */
    useEffect(() => {
        if (user && !isLoadingData && !userDetails) {
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails(), getPlaylistDetail(), getPlaylists()]).then(
                (result) => {
                    const userDetailPromise = result[0];
                    const playlistPromise = result[1];
                    const palylistsPromise = result[2]

                    if (userDetailPromise.status === "fulfilled") {
                        setUserDetails(userDetailPromise.value.data as UserDetails)
                    }
                    if (playlistPromise.status === "fulfilled") {
                        setPlaylist(playlistPromise.value.data as Playlist);
                    }
                    if (palylistsPromise.status === "fulfilled") {
                        setPlaylists(palylistsPromise.value.data as Playlist[]);
                    }
                }
            );
        } else if (!user && !isLoadingData && isLoadingUser) {
            setUserDetails(null)
        }
    }, [user, isLoadingUser, isLoadingData, userDetails, supabase,
        getUserDetails, getPlaylistDetail, getPlaylists, setPlaylists]);

    /**
     * @description The value object provided by the context.
     * @type {UserContextType}
     */
    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        playlist,
        playlists
    }


    return <UserContext.Provider value={value} {...props} />
}


/**
 * @description A custom hook that allows components to access the user and playlist data from the `UserContext`.
 * It ensures the hook is used within the `MyUserContextProvider` to prevent errors.
 *
 * @hook
 * @returns {UserContextType} The user and playlist data from the context.
 * @throws {Error} If the hook is used outside of a `MyUserContextProvider`.
 */
export const useUsers = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a MyUserContextProvider");
    }

    return context;
}