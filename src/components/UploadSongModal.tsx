import React from 'react'
import ModalContainer from './ModalContainer'
import useUploadSongModal from '@/hooks/useUploadSongModal'
const UploadSongModal = () => {
    const { onClose, isOpen } = useUploadSongModal()

    const handleOpenModal = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }
    return (

        <ModalContainer
            title='Upload Your Songs'
            description=''
            isOpen={isOpen}
            onChange={handleOpenModal}
        >
            <div>
                This is upload song modal
            </div>
        </ModalContainer>
    )
}

export default UploadSongModal
