"use client"
import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'

const RegisterPage = () => {



  return (
    <div className='flex flex-row justify-center gap-10 mt-48 ml-40 animate-slideIn'>
      <Link href='/auth/signup/customer' className='max-w-xs p-4 rounded-lg border-[#22c55e] border-2 bg-muted-'>

        <article className='flex flex-col md:flex-row items-center justify-center gap-4'>
          <FontAwesomeIcon icon={faUser} className='text-foreground text-4xl' />
          <div>
            <h2 className='text-lg font-bold text-emerald-300' style={{ fontFamily: "'Nothing You Could Do', cursive" }}>User</h2>
            <p>
              Join as a user and gain access to tools that will help you save time eating healthier.
            </p>
          </div>
        </article>
      </Link>

      <Link href='/auth/signup/chef' className='max-w-xs p-4 rounded-lg bg-muted- border-[#22c55e] border-2 b animate-slideInRight'>
      <article className='flex flex-col md:flex-row items-center justify-center gap-2'>
        
          <FontAwesomeIcon icon={faUser} className='text-foreground text-4xl' />
          <div>
          <h2 className='text-lg font-bold text-emerald-300' style={{ fontFamily: "'Nothing You Could Do', cursive" }}>Vendor</h2>
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