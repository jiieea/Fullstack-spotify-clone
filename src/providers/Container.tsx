import React from 'react'
import { ContainerProviderProps } from '../app/interfaces/types'
const ContainerProvider: React.FC<ContainerProviderProps> = ({ userName, children }) => {
  return (
    <div className='flex flex-col gap-y-4 mt-8 p-4'>
      <h1 className='text-white font-semibold text-2xl px-5'>
        Design For {userName}
      </h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-8 p-3'>
        {children}
      </div>
    </div>
  )
}

export default ContainerProvider
