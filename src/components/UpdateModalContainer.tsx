import React from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { ModalContainerProps } from '@/app/interfaces/types';
import { IoMdClose } from 'react-icons/io';

export const UpdateModalContainer: React.FC<ModalContainerProps> = (
    {
        isOpen,
        onChange,
        title,
        description,
        children
    }
) => {
    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={onChange}
        >
            <Dialog.Portal>
                <Dialog.Overlay
                    className='inset-0
                 fixed bg-800/70 
                 backdrop-blur-sm z-50'/>
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
             flex space-y-5 flex-col
             bg-neutral-800
             focus:outline-none
             overflow-y-auto {/* Added for scrollability if content exceeds max-height */}
'
                >
                    <Dialog.Title
                        className=' text-white font-semibold text-2xl mb-3'
                    >
                        {title}
                    </Dialog.Title>
                    <Dialog.Description>
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
    )
}
