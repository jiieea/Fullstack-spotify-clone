import React from 'react'
import getSong from '../action/getSong'
import CardContainer from './components/CardContainer';
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import getUserData from '../action/getUserData';

const page  =async() => {
    const songs = await getSong();
    const cookiesStore = cookies();
       const supabase = createServerClient(
           process.env.NEXT_PUBLIC_SUPABASE_URL!,
           process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
           {
               cookies: {
                   async get(name: string) {
                       return (await cookiesStore).get(name)?.value;
                   },
                   async set(name: string, value: string, options) {
                       (await cookiesStore).set(name, value, options);
                   },
                   async remove(name: string, options) {
                       (await cookiesStore).set(name, '', options);
                   }
               }
           }
       )
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
