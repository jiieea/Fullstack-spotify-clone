"use client"

import AuthModal from '@/components/AuthModal';
import UpdateModal from '@/components/UpdateModal';
import UploadSongModal from '@/components/UploadSongModal';
import React, { useEffect, useState } from 'react'
import {ModalProvidersProps} from '../app/interfaces/types'
import UploadPlaylistModal from '@/components/UploadPlaylistModal';


export const ModalProviders:React.FC<ModalProvidersProps> = (
  {
    userData
  }
) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadSongModal />
      <UpdateModal  userData={ userData}/>
<UploadPlaylistModal />
    </>
  )
}
