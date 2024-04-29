"use client"
import React, { useState } from 'react'

import { NavTabs } from '@/components/shared'
import { faBookBookmark, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CustomerSignUpFlow } from '../misc/components/customers'

const RegisterPage = () => {
  const [currentTab, setCurrentTab] = useState('Overview')


  const cat = [
    {
      title: 'User',
      id: '1',
      component: <CustomerSignUpFlow/>

    },
    {
      title: 'Chef',
      id: '2',
      component: <p>COM</p>
    },

  ]
  return (
    <article className='grid place-content-center p-6'>

      <NavTabs
        categoryArray={cat}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        fallback='/'
        listClass='text-foreground'
      />
    </article>
  )
}

export default RegisterPage