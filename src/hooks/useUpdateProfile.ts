import { ModalProps } from "@/app/interfaces/types";
import { create } from "zustand";

const useUpdateProfile = create<ModalProps>((set) => ({
    isOpen : false,
    onOpen : () => set({ isOpen : true}),
    onClose : () => set({ isOpen : false})
}))


export default useUpdateProfile