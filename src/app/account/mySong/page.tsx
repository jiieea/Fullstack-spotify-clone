import React from 'react'

 const page = () => {
  return (
    <div className="flex flex-col gap-x-4 py-5 px-6 mt-4">
       <div className='flex flex-col gap-x-2'>
         <h1 className='font-bold text-2xl text-white'>Your Top Songs</h1>
        <p className='text-neutral-400 hover:text-white hover:underline transition'>Visible only to you</p>
       </div>
    </div>
  )
}


export default page;