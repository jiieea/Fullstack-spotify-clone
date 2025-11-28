export const formatTime = (seconds : number) => {
    if(isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    const formatedSec = sec < 10 ? `0${ sec }` : `${ sec }`
    return `${ minutes }:${ formatedSec  }`
}