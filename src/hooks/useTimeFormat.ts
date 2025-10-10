import { useMemo } from "react";


const useTimeFormat = (isoDateString : string) => {

    const formattedDate = useMemo(() => {
        if(!isoDateString) {
            return "";
        }

        const dateObj : Date = new Date(isoDateString);

        const options : Intl.DateTimeFormatOptions = {
            day :"numeric",
            month : 'long',
            year : 'numeric',
            timeZone : 'UTC'
        }

        return dateObj.toLocaleDateString('en-GB' , options);
    } , [ isoDateString])

    return formattedDate
}



export default useTimeFormat;