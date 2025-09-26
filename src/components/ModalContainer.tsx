import React from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from 'react-icons/io';
import { LuAudioWaveform } from "react-icons/lu";

interface ModalContainerProps {
    children: React.ReactNode;
    title: string;
    description: string;
    isOpen: boolean;
    onChange: (open: boolean) => void;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
    children,
    title,
    isOpen,
    description,
    onChange
}) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm z-50" />

                <Dialog.Content
                    className='fixed 
                        drop-shadow-md
                        top-[50%]
                        border border-neutral-700
                        left-[50%]
                        max-h-[85vh] {/* Adjusted to explicitly set max height for all screen sizes */}
                        w-[90vw] {/* Changed from md:w-[90wh] to a more standard viewport width */}
                        md:max-w-[550px]
                        translate-x-[-50%]
                        translate-y-[-50%]
                        rounded-md
                        p-[25px]
                        z-[999]
                        bg-neutral-800
                        focus:outline-none
                        overflow-y-auto {/* Added for scrollability if content exceeds max-height */}
        '>
                    <Dialog.Title
                        className="text-white text-center  sm:text-3xl md:text-4xl font-bold
            mb-4 flex flex-col justify-center items-center gap-y-3"
                    >
                        <div className="p-2 bg-white rounded-full">
                            <LuAudioWaveform size={30} className="text-neutral-800" />
                        </div>
                        {title}
                    </Dialog.Title>

                    <Dialog.Description className="text-gray-400 text-center mb-6 text-sm sm:text-base">
                        {description}
                    </Dialog.Description>

                    <div className="text-white space-y-2">
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
    );
};

export default ModalContainer;