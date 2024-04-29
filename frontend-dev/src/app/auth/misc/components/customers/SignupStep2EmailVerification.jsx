"use client"

import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

// import { useErrorModalState } from '@/hooks';
import { formatAxiosErrorMessage } from '@/utils/errors';
import { Button, ErrorModal, LoaderBtn } from '@/components/shared';

// import { InfoStar, RightUpArrow } from '../../icons';
import { useRequestPasswordResetOTP } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';







const CustomerEmailVerification = ({ user, onVerified }) => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    closeErrorModal,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  const [tokenError, setTokenError] = useState(false)
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const inputRefs = Array(6).fill(0).map(() => React.createRef());
  const [slide, setslide] = useState<string>("stagnant")

  useEffect(() => {
    const timer = setTimeout(() => {
      setslide("in");
    }, 30);
    return () => clearTimeout(timer);
  }, []);


  const handleInputChange = (e, index) => {
    const newValue = e.target.value;

    if (/^\d*$/.test(newValue)) {
      const newVerificationCode = [...verificationCode];

      if (newValue.length <= 1) {
        newVerificationCode[index] = newValue;
        setVerificationCode(newVerificationCode);

        if (newValue && index < 5) {
          inputRefs[index + 1].current?.focus();
        }
      } else if (newValue.length > 1) {
        const newValuesArrays = newValue.split("");

        newValuesArrays.forEach((value, i) => {
          if (newVerificationCode[index + i] !== undefined) {
            newVerificationCode[index + i] = value;
          }
        });

        setVerificationCode(newVerificationCode);

        if (index + newValuesArrays.length < 5) {
          inputRefs[index + newValuesArrays.length].current?.focus();
        }
        else {
          inputRefs[5].current?.focus()
        }
      }
    }
  };

  const handleInputBackspace = (e, index) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index - 1] = '';
      setVerificationCode(newVerificationCode);
      inputRefs[index - 1].current?.focus();
    }
  };



  const handleFormSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const code = verificationCode.join('');
    if(code.length < 6){
      setTokenError(true)
      return
  }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/auth/verify/`,
        { otp: code, recipient: user.email });

      if (response.status === 200) {
        setslide("out")
        onVerified()
      }

      return response;
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.errors.message == "invalid or expired OTP.") {
          setTokenError(true)
          return
        }
        const errorMessage = formatAxiosErrorMessage(error);
        openErrorModalWithMessage(errorMessage);
      }
      // throw error;
    }
  };
  useEffect(() => {
    if (verificationCode.join("").length == 6) {
      handleFormSubmit()
    }
  }, [verificationCode])

  const { mutate: requestOTP, isLoading: isRequestingOTP } = useRequestPasswordResetOTP()
  const getOTP = async () => {
    requestOTP({ email: user.email }, {
      onSuccess() {
      },
    })
  }



  return (
    <div className={`flex flex-col items-center justify-center w-full  min-h-[58vh] lg:min-h-[72vh] 3xl:min-h-[780px] h-full my-auto lg:px-9 transition-transform duration-300 ${slide == "stagnant" ? "translate-x-[110%]" : slide == "in" ? "translate-x-0" : slide == "out" ? "translate-x-[-120%]" : ""} `}>
      <header className='flex flex-col items-start'>
        <h1 className='text-3xl lg:text-[2.35rem] text-left font-clash font-medium text-white'>Verify your account</h1>
        <p className="text-[#BCBCBC] text-sm md:font-base mb-6">An OTP code has been sent to <span className='font-medium text-white'> {user.email}. </span>
          Enter the 6-digit OTP below to verify your account </p>
      </header>


      <form onSubmit={handleFormSubmit} className='w-full flex flex-col gap-6 '>
        <div className="confirm-title text-center xs:mb-20">
          <div className="flex justify-between gap-2 color-black max-w-[325.5px] ">
            {
              verificationCode.map((digit, index) => (
                <input
                  key={index}
                  className="border-[1.5px] border-white/50 rounded-lg md:rounded-xl outline-none  focus:outline-white focus:outline-offset-2 focus:outline-[1.75px] w-[calc(25%_-_5px)] max-w-[45px] bg-white/60 text-white text-bold text-xl text-center font-clash aspect-[1/1] transition-all"
                  type="text"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleInputBackspace(e, index)}
                  ref={inputRefs[index]}
                />
              ))
            }
          </div>
          {tokenError && <p className='text-red-500 font-[0.85rem] self-start my-1'>Invalid or expired token</p>}
          <aside className='flex justify-between w-full my-4 text-white text-xs'>
            <h2>Didn&apos;t receive the OTP?</h2>
            <button type="button" id="resendOTP" className='flex items-center gap-4' onClick={getOTP}><FontAwesomeIcon icon={faInfoCircle}/>
              Resend OTP
              {
                isRequestingOTP &&
                <LoaderBtn width={12} height={12} color='white' />
              }
            </button>
          </aside>
        </div>

        <section className='flex flex-col gap-4 w-fulll'>
          <span className='btn-secondary text-[0.7rem] px-1.5 text-center py-3 w-full bg-white/50 text-white'>If you  did not see the email in your inbox, kindly check your spam folder</span>
          {/* <button className="bg-white flex items-center justify-center w-full disabled:bg-primary-light py-2 px-3 rounded-lg text-primary text-center disabled:opacity-50" type="submit" disabled={verificationCode.join("").length < 6}>
            <span className=' text-sm md:text-[1.05rem] text-secondary-dark font-medium mx-auto flex-1'>Confirm email</span>
            <span className='flex items-center justify-center ml-auto bg-primary rounded-full w-9 h-9'><RightUpArrow height={14} width={14} className='translate-y-0.5' /></span>
          </button> */}
        </section>


        {/* <ErrorModal
          isErrorModalOpen={isErrorModalOpen}
          setErrorModalState={setErrorModalState}
          subheading={
            errorModalMessage || 'Something went wrong.'
          }
        >
          <div className="flex gap-3 rounded-2xl bg-red-50 px-8 py-6">
            <Button
              className="grow bg-red-950 hover:border-red-950 hover:text-red-950 px-1.5 sm:text-sm md:px-6"
              type="button"
              onClick={closeErrorModal}
            >
              Okay
            </Button>
          </div>
        </ErrorModal> */}
      </form>
    </div>
  );
};

export default CustomerEmailVerification;
