import { create } from "zustand";

interface AuthModalHookProps {
    isOpen : boolean,
    onOpen : () => void,
    onClose : () => void
}

const useAuthModal =  create<AuthModalHookProps>((set) => ({
    isOpen : false,
    onOpen:() => set({ isOpen : true }),
    onClose : () => set({ isOpen : false})
}))



export default useAuthModal;