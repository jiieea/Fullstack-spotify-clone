import React from 'react'
import AccountHeader from './components/AccountHeader'
import getUserData from '../action/getUserData'
const page = async() => {
  const data =  await getUserData();
  return (
      <AccountHeader 
        data = { data }
      />
  )
}

export default page
