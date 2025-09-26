import { useEffect, useState } from "react"


export const useNavigationTracker = () => {
    const [ canGoback , setCanGoback ] = useState(false)
    const [canGoForward  , setCanGoForward ] = useState(false);

    useEffect(() => {
        setCanGoback(window.history.length > 1);
        setCanGoForward(false)

        const popState = () => {
            setCanGoback(window.history.length > 1)
            setCanGoForward(false)
        }

        window.addEventListener('popstate' , popState);
        return () => window.removeEventListener('popstate' , popState)
    }, [])

    return {
        canGoForward,
        canGoback
    }
}


