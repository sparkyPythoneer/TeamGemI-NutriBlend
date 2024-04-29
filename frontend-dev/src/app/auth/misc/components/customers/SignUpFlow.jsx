"use client"
import React, { useState } from 'react';
import { useCustomerRegisterDetails, } from '../../store';
import CustomerSignupForm from './SignupStep1PersonalDetails';
import CustomerEmailVerification from './SignupStep2EmailVerification';


const CustomerSignUpFlow = () => {
  const { step, userData, moveToNextStep, setUserData, clearStorage } = useCustomerRegisterDetails();

  const handleSignUp = (data) => {
    setUserData(data);
    moveToNextStep();
  };

  const handleVerification = () => {
    moveToNextStep();
  };

  const handleDetailsSubmit = (details) => {
    setUserData({ ...userData, ...details });
    moveToNextStep();
  };




  return (
    <div className='relative z-10 gap-6 overflow-y-scroll my-auto  max-lg:h-full w-full no-scrollbar '>
    <div className='flex items-center justify-center relative overflow-y-scroll rounded-2xl mt-[10vh] mb-[5vh] lg:max-xl:my-[6vh] xl:my-[6.5vh] w-full '>
      <article className='relative flex items-center justify-center max-lg:px-4 md:max-lg:px-10 lg:px-8 rounded-2xl max-h-full overflow-y-scroll  w-[90%] md:max-lg:!w-[75%] lg:max-xl:!w-[85%]   2xl:w-[600px] max-w-[610px] lg:min-h-[85vh]'>
          {step === 1 && <CustomerSignupForm onNext={handleSignUp} />}
          {step === 2 && <CustomerEmailVerification user={userData} onVerified={handleVerification} />}
          {/* {step === 3 && <TalentDetailsForm user={userData} onDetailsSubmit={handleDetailsSubmit} />} */}
          <div className='absolute inset-0 z-[-1] rounded-[1.1875rem] from-[#EDF4FF] from-[-31.2%] to-white/20 to-[24.74%] opacity-40 bg-gradient-358 backdrop-blur-lg'></div>
        </article>
      </div>
    </div>
  );
};

export default CustomerSignUpFlow;