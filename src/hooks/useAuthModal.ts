import { create } from "zustand";
import {ModalProps} from '../app/interfaces/types'

const useAuthModal =  create<ModalProps>((set) => ({
    isOpen : false,
    onOpen:() => set({ isOpen : true }),
    onClose : () => set({ isOpen : false})
}))



export default useAuthModal;