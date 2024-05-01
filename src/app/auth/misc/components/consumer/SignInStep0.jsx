"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';


import { cn } from '@/utils/classname';
import { zodResolver } from '@hookform/resolvers/zod';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
// import { EyeSlash, ViewIcon } from '../../../signin/icons';
import { SmallSpinner } from '@/components/shared';
import { ArrowRight } from 'lucide-react';
import { displayFont } from '@/app/layout';
import { useRouter, useSearchParams } from 'next/navigation';
import { setAccessToken } from '@/utils/tokens';
import { useCustomerLoginDetails } from '../../store';
import { useSignIn } from '../../api';
import { EyeSlash, ViewIcon } from '@/app/auth/signin/icons';
import { formatAxiosErrorMessage, setFormErrors } from '@/utils/errors';
import useCustomerDetailsStore from '@/context/userDetailsStore';






const registerForm = z.object({
  email: z.string({ required_error: 'Enter email.' }).email({ message: 'Enter valid email' }),
  password: z.string({ required_error: 'Enter password.' }).min(8, "Password must be at least 8 characters").regex(/(?=.*\d)/, "Password must contain a number").regex(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .regex(/(?=.*[a-z])/, "Password must contain a lowercase letter").regex(/(?=.*[@#$%^&+=])/, "Password must contain a special character (@#$%^&+=)"),
});








const CustomerSigninForm = ({ onNext }) => {
  const { userData, moveToNextStep, setUserData } = useCustomerLoginDetails();
  const { setUserId } = useCustomerDetailsStore();

  const { handleSubmit, register, formState: { errors, isDirty, isValid }, setError, control, watch, setValue } = useForm({
    defaultValues: {
      email: userData.email,
      password: userData.password,
    },
    resolver: zodResolver(registerForm)
  });
  const router = useRouter()

  const { mutateAsync: signIn, isLoading:isSigningIn } = useSignIn();
  const [hasAgreedToTerms, setAgreeToTerms] = useState(false);
  const [slideout, setslideout] = useState(false);
  const [showPassword, setShowPassword] = useState(false)



  React.useEffect(() => {
    const subscription = watch((value) => {
      setUserData(value);
    });

    return () => subscription.unsubscribe();
  }, [watch]);


  const params = useSearchParams()
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////                  SUBMIT FORM AND CREATE USER                          /////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  const redirectError = params.get('session')
  useEffect(() => {
    if (redirectError === "session") {
      toast.error("Session Expired! Log in to continue", { id: "234" });
    }
    else if (redirectError === "logout") {
      toast.error("Log in again to continue", { id: "234" });
    }
  }, [])


  const onSubmit = async (data) => {
    try {
      await signIn(data, {
        onSuccess: async (response) => {
          await setAccessToken(response?.access)
          console.log(response)
          const redirect = params.get('redirect')
          setUserId(response?.user)
          if (redirect) {
            router.push(redirect)
          } else {
            router.push('/user/chat')
          }
        },

        onError: (error) => {
          setFormErrors(error.response?.data?.errors, { "email": "An account with this email doesn't exist" }, setError)
formatAxiosErrorMessage(error, toast.error)
          // if (error?.response?.status === 412) {
          //     if (
          //         error?.response?.data?.errors.message ==
          //         'USER PROFILE is not verified.'
          //     ) {
          //         requestOTP({ email: data.email }, {
          //             onSuccess() {
          //                 onNext(data);
          //             },
          //         })
          //     }
          // }

        },
      });


    } catch (error) {
      return null


    }
  }









  return (


    <div className={`w-full h-full pt-5 md:pt-[3.5vh] ${slideout && "translate-x-[-120%]"} transition-all duration-500`}>

      <header>
        <h1 className={cn('flex items-center gap-4 text-3xl lg:text-[2.35rem] text-white font-clash font-bold', displayFont.className)}>
          <span>
            Personal Details
          </span>
          {/* <span className='inline-flex items-center justify-center text-lg bg-white/20 px-4 py-0.5 rounded-lg '>
            1/2
          </span> */}
        </h1>
        <p className='text-white mt-1.5 mb-8 text-base font-normal'>Take the next step towards healthy eating.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">


        <div className='inputdiv transparent  my-2 withicon'>
          <label className='!text-white' htmlFor="email">Email</label>
          <div className='relative'>
            <input type="email" placeholder="Email" className={cn(errors.email && "error", "!bg-white/20 text-white placeholder:text-white/60")} {...register('email')} id="email" />
            <span className='absolute left-[3%] top-[25%] md:left-[4%]'><FontAwesomeIcon icon={faEnvelope} /></span>
          </div>
          {errors.email && <p className='formerror'>{errors.email.message}</p>}
        </div>



        {/* <Select
          name={`gender`}
          className=' bg-white/20 backdrop-blur-lg !text-white'
          value={watch(`gender`)}
          onChange={(value) => setValue('gender', value)}
          options={genders}
          placeholder="Select your gender"
          errors={errors}
          label='Gender'
          labelClass='!text-white'
          containerClass='!my-2'
          triggerColor='white'
          fullWidth
        /> */}


        <div className='inputdiv transparent  my-2 withicon'>
          <label className='!text-white' htmlFor="password">Password</label>
          <div className='relative'>
            <input type={showPassword ? 'text' : 'password'} placeholder="Enter password" className={cn(errors.password && "error", "!bg-white/20 text-white placeholder:text-white/60")}  {...register('password')} id="password" />
            <span className='absolute left-[3%] top-[25%] md:left-[4%]'><FontAwesomeIcon icon={faLock} /></span>

            <span className="absolute right-[3%] top-[25%] cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
              {
                showPassword ?
                  <EyeSlash fill='white' />
                  :
                  <ViewIcon fill='white' />
              }
            </span>
          </div>
          {errors.password && <p className='formerror'>{errors.password.message}</p>}
        </div>



        <div className='mt-12 w-full'>


          <button className="bg-white flex items-center justify-center w-full py-2 px-3 rounded-lg text-primary text-center disabled:cursor-not-allowed disabled:opacity-35 transition-colors " type="submit"
            disabled={isSigningIn}
          >

            <span className='flex items-center justify-center gap-4 text-[0.95rem] text-secondary-dark font-medium mx-auto flex-1'>Sign in {isSigningIn && <SmallSpinner/>}</span>
            <span className='flex items-center justify-center ml-auto bg-primary rounded-full w-9 h-9'><ArrowRight className='text-white' /></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerSigninForm;
