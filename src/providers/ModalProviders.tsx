"use client"

import AuthModal from '@/components/AuthModal';
import UpdateModal from '@/components/UpdateModal';
import UploadSongModal from '@/components/UploadSongModal';
import React, { useEffect, useState } from 'react'

export const ModalProviders = () => {
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
      <UpdateModal />
    </>
  )
}
