import React from 'react'
import getSong from '../action/getSong'
import CardContainer from './components/CardContainer';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import getUserData from '../action/getUserData';

const page  =async() => {
    const songs = await getSong();
    const cookiesStore = cookies;
    const supabase = createServerComponentClient({ cookies : cookiesStore})
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;

    const [
        userData 
    ] = await Promise.all([
        getUserData(userId!)
    ]) 
  return (
    <div className='w-full  md:h-full rounded-2xl  bg-neutral-900 h-[85vh]'>
        <CardContainer  songs={ songs } userData={ userData!}/>
    </div>
  )
}

export default page
