export const getRandomSongId = (songIds: string[], currentIdx: number): number => {
    // if the song only one , loop the song 
    if (songIds.length <= 1) return 0;

    let randomIndex;
    // get random 
    do {
        randomIndex = Math.floor(Math.random() * songIds.length);
    } while (randomIndex === currentIdx); // to ensure the song is not the same

    return randomIndex;
}
