import { useCallback, useState } from "react"
import { toast } from "sonner";


const useShuffle = (initState : boolean = false) => {
    const [ isShuffle , setIsShuffle ] = useState(initState);

    // use useCallback to memoize the function . Preventing unnesessary re-renders
   const handleToggleShuffle = useCallback(() => {
    // We use the functional update form for state setter when the new state
    // depends on the previous state.
    setIsShuffle(prevIsShuffle => {
      const newState = !prevIsShuffle;
      // The toast message should use the *new* state (newState)
      const msg = newState ? "Active" : "Inactive";
      toast.success('Shuffle Mode ' + msg);
      return newState;
    });
  }, []); // Empty dependency array means this function never changes


  return {
    isShuffle,
    handleToggleShuffle
  }
}


export default useShuffle;