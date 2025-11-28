import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { CATEGORY_DATA, SONGS_Genre } from '../../../../datas';

const SearchContent = () => {
    const router = useRouter();
    return (
        <div className='flex flex-col gap-y-4 mb-20'>
            <div className='grid grid-cols-2 gap-2'>
                {
                    CATEGORY_DATA.map((cat) => (
                        <div
                            onClick={() => router.push(cat.route)}
                            key={cat.title} className={`relative h-18 p-3 rounded-lg overflow-hidden flex flex-col justify-end shadow-lg cursor-pointer
                            transform transition-transform duration-150 hover:scale-[1.02] ${cat.color}`}>
                            <h3 className="text-white font-bold text-base z-2 leading-snug">{cat.title}</h3>
                            <Image
                                src={cat.imageUrl}
                                alt={cat.title}
                                width={64}
                                height={64}
                                unoptimized
                                className="absolute bottom-[-10px] right-[-10px] w-16 h-16 transform rotate-[25deg] shadow-2xl object-cover rounded-md"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'https://placehold.co/64x64/000000/ffffff?text=Img';
                                }}
                            />
                        </div>
                    ))
                }
            </div>
            <h3 className='text-white font-semibold p-3 mt-3'>Browse all</h3>
            <div className='grid grid-cols-2 gap-2 '>
                {
                    SONGS_Genre.map((song) => (
                        <div
                            onClick={() => router.push(song.route)}
                            key={song.title} className={`relative h-15 p-3 rounded-lg overflow-hidden flex flex-col justify-end shadow-lg cursor-pointer
                         transform transition-transform duration-150 hover:scale-[1.02] ${song.color}`}>
                            <h3 className="text-white font-bold text-base  leading-snug">{song.title}</h3>
                            <Image
                                src={song.imageUrl}
                                alt={song.title}
                                width={52}
                                height={52}
                                unoptimized
                                className="absolute bottom-[-10px] right-[-10px] w-13 h-13
                                 transform rotate-[25deg] shadow-2xl object-cover rounded-md"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'https://placehold.co/64x64/000000/ffffff?text=Img';
                                }}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchContent
