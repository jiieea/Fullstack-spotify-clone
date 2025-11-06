import { useEffect, useState } from "react"

function useDebounceValue<T> (value: T , delay ?: number) : T {
    const [ debounceTime , setDebounceTime ]  = useState(value);


    useEffect(() => {
        const time = setTimeout(() => {
            setDebounceTime(value);
        } , delay || 500)

        return () => {
            clearTimeout(time)
        }
    } , [value ,delay])

    return debounceTime;
}   


export default useDebounceValue;