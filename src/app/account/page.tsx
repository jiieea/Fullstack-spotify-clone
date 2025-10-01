import React from 'react'
import AccountHeader from './components/AccountHeader'
import getUserData from '../action/getUserData'
import getSong from '../action/getSongsByUserId';
import AccountPage from './components/AccountPage';

const page = async () => {
  const data = await getUserData();
  const songs = await getSong();
  return (
    <div className='w-full h-full  bg-neutral-900 rounded-md  md:mb-0 overflow-y-auto'>
      <AccountHeader
        songs={songs}
        data={data}
      />
      <AccountPage  songs={ songs }/>
    </div>
  )
}

export default page
