import { CategoryTileProps } from "@/app/interfaces/types";

export const CATEGORY_DATA: CategoryTileProps[] = [
    {
        title: 'Musics', color: 'bg-pink-600', imageUrl: 'https://placehold.co/100x100/ec4899/ffffff?text=Music', isLarge: true, route: "/search/musics"
    },
    { title: 'Playlists', color: 'bg-emerald-600', imageUrl: 'https://placehold.co/100x100/059669/ffffff?text=Podcasts', isLarge: true, route: "/search/playlists" },
];


export const SONGS_Genre: CategoryTileProps[] = [
    { title: 'Pop Indie', color: 'bg-indigo-500', imageUrl: 'https://placehold.co/100x100/6366f1/ffffff?text=Indie', route: "/search/genre/indie" },
    { title: 'Charts', color: 'bg-rose-500', imageUrl: 'https://placehold.co/100x100/f43f5e/ffffff?text=Charts', route: "/search/genre/nuoveautes" },
    { title: 'Pop', color: 'bg-yellow-500', imageUrl: 'https://placehold.co/100x100/f59e0b/000000?text=Pop', route: "/search/genre/nuoveautes" },
    { title: 'Hip-Hop', color: 'bg-sky-500', imageUrl: 'https://placehold.co/100x100/0ea5e9/ffffff?text=HipHop', route: "/search/genre/nuoveautes" },
    { title: 'Rock', color: 'bg-lime-500', imageUrl: 'https://placehold.co/100x100/84cc16/000000?text=Rock', route: "/search/genre/nuoveautes" },
    { title: 'Workout', color: 'bg-pink-500', imageUrl: 'https://placehold.co/100x100/ec4899/ffffff?text=Gym', route: "/search/genre/nuoveautes" },
    { title: 'Jazz', color: 'bg-gray-500', imageUrl: 'https://placehold.co/100x100/6b7280/ffffff?text=Jazz', route: "/search/genre/nuoveautes" },
    { title: 'Instrumental', color: 'bg-orange-500', imageUrl: 'https://placehold.co/100x100/f97316/ffffff?text=Inst', route: "/search/genre/nuoveautes" },
];