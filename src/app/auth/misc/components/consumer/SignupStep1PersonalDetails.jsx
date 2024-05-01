"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';


import { cn } from '@/utils/classname';
import { zodResolver } from '@hookform/resolvers/zod';

import { useSignUp } from '../../api';
import { useCustomerRegisterDetails } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { EyeSlash, ViewIcon } from '../../../signin/icons';
import { SmallSpinner } from '@/components/shared';
import { ArrowRight } from 'lucide-react';
import { displayFont } from '@/app/layout';






const registerForm = z.object({
  first_name: z.string({ required_error: 'Enter first name.' }).min(1, { message: 'First name is required' }),
  last_name: z.string({ required_error: 'Enter last name.' }).min(1, { message: 'Last name is required' }),
  email: z.string({ required_error: 'Enter email.' }).email({ message: 'Enter valid email' }),
  password: z.string({ required_error: 'Enter password.' }).min(8, "Password must be at least 8 characters").regex(/(?=.*\d)/, "Password must contain a number").regex(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    .regex(/(?=.*[a-z])/, "Password must contain a lowercase letter").regex(/(?=.*[@#$%^&+=])/, "Password must contain a special character (@#$%^&+=)"),
  confirm_password: z.string({ required_error: 'Confirm your password.' }).min(8, "Password must be at least 8 characters"),
});








const CustomerSignupForm = ({ onNext }) => {
  const { userData, moveToNextStep, setUserData } = useCustomerRegisterDetails();
  const { handleSubmit, register, formState: { errors, isDirty, isValid }, setError, control, watch, setValue } = useForm ({
    defaultValues: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      country_code: userData.country_code,
      phone_number: userData.phone_number,
      password: userData.password,
      confirm_password: userData.confirm_password
    },
    resolver: zodResolver(registerForm)
  });


  const { mutateAsync: signUp, isLoading } = useSignUp();
  const [hasAgreedToTerms, setAgreeToTerms] = useState(false);
  const [slideout, setslideout] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)



  React.useEffect(() => {
    const subscription = watch((value) => {
      setUserData(value);

    });

    return () => subscription.unsubscribe();
  }, [watch]);



  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////                  SUBMIT FORM AND CREATE USER                          /////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      setError('confirm_password', { type: 'validate', message: 'Passwords do not match' });
      return;
    }

    try {
 
      const dataToSubmit = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        user_type: "NB_USER",
        password: data.password,
      };

      signUp(dataToSubmit, {
        onSuccess: async () => {
          setTimeout(() => {
            setslideout(true);
          }, 500);
          onNext(data);
        },
        onError: (error) => {
          console.error("An error occurred:", error);
          if (error.response.status === 500 || error.code === "ERR_BAD_RESPONSE") {
            toast.error("An error occurred while trying to create your account. Please try again")
          }
          if (error.response?.status === 400) {
            if (
              error.response?.data?.email &&
              error.response.data?.email[0] === "USER PROFILE with this email already exists."
            ) {
              setError("email", {
                type: "manual",
                message: "An account with this email already exists.",
              });
            } else if (error.response?.data?.data.message === "User already exists.") {
              setError("phone_number", {
                type: "manual",
                message: "An account with this phone number already exists.",
              });
            }

          }
        }
      })


    } catch (error) {
    }
  };








  return (


    <div className={`w-full h-full pt-5 md:pt-[3.5vh] ${slideout && "translate-x-[-120%]"} transition-all duration-500`}>

      <header>
        <h1 className={cn('flex items-center gap-4 text-3xl lg:text-[2.35rem] text-white font-clash font-bold', displayFont.className )}>
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
        <div className='flex flex-col md:flex-row md:gap-4 '>
          <div className='inputdiv transparent  my-2 withicon grow'>
            <label className='!text-white' htmlFor="first_name">First name</label>
            <div className='relative'>
              <input type="text" placeholder="Enter first name" className={cn(errors.first_name && "error", "!bg-white/20 text-white placeholder:text-white/60")} {...register('first_name')} id="first_name" />
              <span className='absolute left-[3%] top-[25%] md:left-[4%]'><FontAwesomeIcon icon={faUser} /></span>

            </div>
            {errors.first_name && <p className='formerror'>{errors.first_name.message}</p>}
          </div>

          <div className='inputdiv transparent  my-2 withicon grow'>
            <label className='!text-white' htmlFor="last_name">Enter last name</label>
            <div className='relative'>
              <input type="text" placeholder="Enter last name" className={cn(errors.last_name && "error", "!bg-white/20 text-white placeholder:text-white/60")} {...register('last_name')} id="last_name" />
              <span className='absolute left-[3%] top-[25%] md:left-[4%]'><FontAwesomeIcon icon={faUser} /></span>
            </div>
            {errors.last_name && <p className='formerror'>{errors.last_name.message}</p>}
          </div>
        </div>

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

        <div className='inputdiv transparent  my-2 withicon'>
          <label className='!text-white' htmlFor="confirm_password">Confirm Password</label>
          <div className='relative'>
            <input type={showPassword2 ? 'text' : 'password'} placeholder="Confirm password" className={cn(errors.confirm_password && "error", "!bg-white/20 text-white placeholder:text-white/60")}   {...register('confirm_password')} id="confirm_password" />
            <span className='absolute left-[3%] top-[25%] md:left-[4%]'><FontAwesomeIcon icon={faLock} /></span>
            <span className="absolute right-[3%] top-[25%] cursor-pointer" onClick={() => setShowPassword2((prev) => !prev)}>
              {
                showPassword2 ?
                  <EyeSlash fill='white' />
                  :
                  <ViewIcon fill='white' />
              }
            </span>
          </div>
          {errors.confirm_password && <p className='formerror'>{errors.confirm_password.message}</p>}
        </div>

        <div className='mt-12 w-full'>
          <div className='flex items-center gap-2 my-2 text-xs'>
            <input type="checkbox" checked={hasAgreedToTerms} onChange={() => setAgreeToTerms(!hasAgreedToTerms)} className='h-4 w-4 border-2 rounded-sm' />
            <span className='text-white/70'>By registering and signing in, you agree to our <Link className=' font-semibold text-[0.78rem] text-white hover:underline' href={'/terms'}> Terms & Conditions</Link></span>
          </div>

          <button className="bg-white flex items-center justify-center w-full disabled:bg-primary-light py-2 px-3 rounded-lg text-primary text-center disabled:cursor-not-allowed disabled:opacity-35 transition-colors " type="submit"
            disabled={!hasAgreedToTerms || isLoading}
          >

            <span className='flex items-center justify-center gap-4 text-[0.95rem] text-secondary-dark font-medium mx-auto flex-1'>Proceed {isLoading && <SmallSpinner className='text-primary' />}</span>
            <span className='flex items-center justify-center ml-auto bg-primary rounded-full w-9 h-9'><ArrowRight className='text-white' /></span>
          </button>
          <div className='flex flex-wrap items-center justify-center gap-1 mt-2 mb-8 px-6 py-3 border-[1px] border-white/60 rounded-lg w-full text-sm text-white/70 '>Do you already have an account? <Link className='text-white text-medium text-sm' href={'/auth/login'}>Sign in</Link></div>
        </div>
      </form>
    </div>
  );
};

export default CustomerSignupForm;
