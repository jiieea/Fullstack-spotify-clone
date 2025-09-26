import React from 'react'
import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from 'react-icons/io'
import { LuAudioWaveform } from "react-icons/lu";

interface ModalContainerProps {
    children: React.ReactNode,
    title: string,
    description: string,
    isOpen: boolean,
    onChange: (open: boolean) => void
}
const ModalContainer: React.FC<ModalContainerProps> = ({
    children,
    title,
    isOpen,
    description,
    onChange
}) => {
    return (
        <Dialog.Root
            open={isOpen}
            defaultOpen={isOpen}
            onOpenChange={onChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay
                    className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-50"
                />

                <Dialog.Content
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
             w-[200vw] max-w-2xl max-h-[85vh] overflow-y-auto
             bg-black border border-[#282828] rounded-lg
             shadow-lg p-6 z-[999] focus:outline-none"
                >
                    <Dialog.Title
                        className="text-white 
                    text-center text-4xl font-bold 
                    mb-4 flex flex-col justify-center 
                    items-center gap-y-3">
                       <div className='p-2 bg-white rounded-full'>
                       <LuAudioWaveform size={30} className=' rounded-full text-neutral-800 ' />
                       </div>
                        {title}
                    </Dialog.Title>

                    <Dialog.Description className="text-gray-400 text-center mb-6">
                        {description}
                    </Dialog.Description>

                    <div className="text-white space-y-4">
                        {children}
                    </div>

                    <Dialog.Close asChild>
                        <button
                            title="Close"
                            className="absolute top-4 right-4 text-gray-400 hover:text-white
                 h-6 w-6 flex items-center justify-center rounded-full
                 focus:outline-none transition-colors"
                        >
                            <IoMdClose size={20} />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>

            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default ModalContainer;