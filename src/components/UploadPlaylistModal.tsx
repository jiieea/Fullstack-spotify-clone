import useCreatePlaylistModal from '@/hooks/useCreatePlaylistModal'
import { useUsers } from '@/hooks/useUsers';
import React from 'react'
import ModalContainer from './ModalContainer';

const UploadPlaylistModal = () => {
    const { onClose , isOpen } = useCreatePlaylistModal();
    const { user } = useUsers();

    const handleOpenModal = (isOpen : boolean) => {
        if(!isOpen) {
            onClose();
        }
    }

  return (
   <ModalContainer
   title='Create Playlist'
   description='You can create new playlist'
   isOpen ={ isOpen }
   onChange={handleOpenModal}
   >
    <div>
        <p>this is upload playlist modal</p>
    </div>
   </ModalContainer>
  )
}

export default UploadPlaylistModal
