"use client"
import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'

const RegisterPage = () => {



  return (
    <div className='grid place-content-center p-6'>
      <Link href='./signup/consumer' className='max-w-xs p-4 rounded-lg bg-muted-'>

        <article className='flex flex-col md:flex-row items-center justify-center gap-2'>
          <FontAwesomeIcon icon={faUser} className='text-foreground text-4xl' />
          <div>
            <h2>User</h2>
            <p>
              Join as a user and gain access to tools that will help you save time eating healthier.
            </p>
          </div>
        </article>
      </Link>

      <Link href='./signup/chef' className='max-w-xs p-4 rounded-lg bg-muted-'>
      <article className='flex flex-col md:flex-row items-center justify-center gap-2'>
        
          <FontAwesomeIcon icon={faUser} className='text-foreground text-4xl' />
          <div>
            <h2>Vendor</h2>
            <p>
              Join as a vendor and gain access to tools that will help you save time eating healthier.
            </p>
          </div>
        </article>
      </Link>


    </div>
  )
}

export default RegisterPage