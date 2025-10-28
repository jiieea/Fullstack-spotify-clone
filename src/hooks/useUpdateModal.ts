import { ModalProps } from "@/app/interfaces/types";
import { create } from "zustand";

const useUpdatePlaylist = create<ModalProps>((set) => ({
    isOpen : false,
    onOpen : () => set({ isOpen : true}),
    onClose : () => set({ isOpen : false})
}))


export default useUpdatePlaylist