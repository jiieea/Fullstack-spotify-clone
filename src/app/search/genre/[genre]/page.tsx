import getSongsByGenre from '@/app/action/getSongsByGenre';
import React from 'react'
import GenreContent from './components/GenreContent';

interface PageProps {
    params : Promise<{ genre : string }>
}

const page = async({
    params
} : PageProps) => {
    const { genre } = await params;
    const songs  = await getSongsByGenre(genre);
  return (
    <div>
        <GenreContent 
      songs ={ songs! }
      genre={ genre }
        />
    </div>
  )
}

export default page
