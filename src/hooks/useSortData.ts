import { Song } from '../../types'


const sortDataByArtist = (songs : Song[]) => {
    const sortedData =  songs.sort((a, b ) => a.author.localeCompare(b.author));
    return sortedData;
}


const sortDataByTitle = (songs : Song[]) => {
    const sortedData = songs.sort((a , b ) => a.title.localeCompare(b.title));
    return sortedData;
}


const sortedDataByCreatedDate = (songs : Song[])=> {
    const sortedData = songs.sort((a, b ) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    return sortedData;
}

export {
    sortDataByArtist,
    sortDataByTitle,
    sortedDataByCreatedDate
}