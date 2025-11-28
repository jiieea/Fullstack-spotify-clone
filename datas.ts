import { CategoryTileProps } from "@/app/interfaces/types";

export const CATEGORY_DATA: CategoryTileProps[] = [
    {
        title: 'Musics', color: 'bg-pink-600', imageUrl: 'https://placehold.co/100x100/ec4899/ffffff?text=Music', isLarge: true, route: "/search/musics"
    },
    { title: 'Playlists', color: 'bg-emerald-600', imageUrl: 'https://placehold.co/100x100/059669/ffffff?text=Playlists', isLarge: true, route: "/search/playlists" },
];


export const SONGS_Genre: CategoryTileProps[] = [
    { title: 'Pop Indie', color: 'bg-indigo-500', imageUrl: 'https://placehold.co/100x100/6366f1/ffffff?text=Indie', route: "/search/genre/indie" },
    { title: 'J-pop', color: 'bg-rose-500', imageUrl: 'https://placehold.co/100x100/f43f5e/ffffff?text=J-Pop', route: "/search/genre/japanese" },
    { title: 'Pop', color: 'bg-yellow-500', imageUrl: 'https://placehold.co/100x100/f59e0b/000000?text=Pop', route: "/search/genre/pop" },
    { title: 'Alternative', color: 'bg-sky-500', imageUrl: 'https://placehold.co/100x100/0ea5e9/ffffff?text=Alternative indie', route: "/search/genre/alternative" },
    { title: 'Rock', color: 'bg-lime-500', imageUrl: 'https://placehold.co/100x100/84cc16/000000?text=Rock', route: "/search/genre/rock" },
    { title: 'BritPop', color: 'bg-pink-500', imageUrl: 'https://placehold.co/100x100/ec4899/ffffff?text=Britpop', route: "/search/genre/britpop" },
    { title: 'Jazz', color: 'bg-gray-500', imageUrl: 'https://placehold.co/100x100/6b7280/ffffff?text=Jazz', route: "/search/genre/nuoveautes" },
    { title: 'SlowCore', color: 'bg-orange-500', imageUrl: 'https://placehold.co/100x100/f97316/ffffff?text=SlowCore', route: "/search/genre/slowcore" },
];