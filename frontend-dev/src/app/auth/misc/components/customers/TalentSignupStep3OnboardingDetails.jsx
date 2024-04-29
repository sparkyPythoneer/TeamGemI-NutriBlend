// "use client"

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { z } from 'zod';
// import { Country, State, City, ICountry, IState } from 'country-state-city';
// import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';


// import { cn, setAccessToken } from '@/utils';
// import { Select, LoaderBtn, RadioGroup, SelectSingleCombo, ErrorModal, Button, LoadingOverlay } from '@/components/shared';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { job_type, work_experiences } from '@/app/(website-main)/e/jobs/misc/constants';
// ;
// import { useSignIn } from '../../api/useSignIn';
// import { useTalentOnboardMutation } from '../../api/useOnboardTalent';
// import { RightUpArrow } from '../../icons';
// import { useErrorModalState } from '@/hooks';
// import { useTalentRegisterDetails } from '../../store';

// interface TalentDetailsFormProps {
//     onDetailsSubmit: (details: any) => void;
//     user: { first_name: string | undefined, email: string, password: string };

// }

// const currently_employed = [
//     { name: 'Yes', value: 'true' },
//     { name: 'No', value: 'false' },
// ]
// const willing_to_relocate = [
//     { name: 'Yes', value: 'true' },
//     { name: 'No', value: 'false' },
// ]


// type FormData = {
//     address: string,
//     desired_role: string,
//     years_of_experience: string,
//     stack: string,
//     job_type: string,
//     currently_employed: string,
//     willing_to_relocate: string,
//     country: string,
//     state: string,
// };

// const TalentDetailsFormResolver = z.object({
//     address: z.string({ required_error: 'Enter address.' }).min(1, { message: 'Home address is required' }),
//     desired_role: z.string({ required_error: 'Enter last name.' }).min(1, { message: 'Last name is required' }),
//     years_of_experience: z.string({ required_error: 'Enter years of experience.' }),
//     stack: z.string({ required_error: 'Enter stack.' }),
//     job_type: z.string({ required_error: 'Enter preffered job type.' }),
//     currently_employed: z.string({ required_error: 'Choose current employment status.' }),
//     willing_to_relocate: z.string({ required_error: 'Choose relocation preference.' }),
//     country: z.string({ required_error: 'Please select country.' }),
//     state: z.string({ required_error: 'Please select state.' }),
// });






// const TalentDetailsForm: React.FC<TalentDetailsFormProps> = ({ user, onDetailsSubmit }) => {
//     const { userData, moveToNextStep, setUserData, clearStorage } = useTalentRegisterDetails();
//     const {
//         isErrorModalOpen,
//         setErrorModalState,
//         closeErrorModal,
//         openErrorModalWithMessage,
//         errorModalMessage,
//     } = useErrorModalState();





//     const signIn = useSignIn();
//     const { mutateAsync: onBoardTalent, isLoading: isOnboardingTalent } = useTalentOnboardMutation();
//     const [slide, setslide] = useState<string>("stagnant")

//     useEffect(() => {
//         const loginData = {
//             email: user.email || userData.email,
//             password: user.password || userData.email,
//         }

//         signIn.mutateAsync(loginData, {
//             onSuccess: async (response) => {
//                 await setAccessToken(response?.data?.data.access)
//             }
//         });

//         const timer = setTimeout(() => {
//             setslide("in");
//         }, 15);
//         return () => clearTimeout(timer);
//     }, []);






//     //////////////////////////////////////////////////////////////////////
//     //////////////////////////////////////////////////////////////////////
//     //////////////////////////////////////////////////////////////////////
//     //////////                          FORM                    //////////
//     //////////////////////////////////////////////////////////////////////
//     //////////////////////////////////////////////////////////////////////
//     //////////////////////////////////////////////////////////////////////
//     const { handleSubmit, register, formState: { errors, isDirty, isValid }, control, watch, setValue } = useForm<FormData>({
//         defaultValues: {
//             address: userData.address,
//             desired_role: userData.desired_role,
//             years_of_experience: userData.years_of_experience,
//             stack: userData.stack,
//             job_type: userData.job_type,
//             currently_employed: userData.currently_employed,
//             willing_to_relocate: userData.willing_to_relocate,
//             country: userData.country,
//             state: userData.state,

//         },
//         resolver: zodResolver(TalentDetailsFormResolver)
//     });;


//     //////////////////////////////////////////////////////////////////////
//     ///////               SAVE INPUTS TO STORE                     ///////
//     //////////////////////////////////////////////////////////////////////
//     React.useEffect(() => {
//         const subscription = watch((value) => {
//             setUserData(value);
//         });
//         return () => subscription.unsubscribe();
//     }, [watch]);


//     //////////////////////////////////////////////////////////////////////
//     ///////               COUNTRY AND STATE SELECTION              ///////
//     //////////////////////////////////////////////////////////////////////
//     const [countryList, setCountryList] = useState<ICountry[]>()
//     const [stateList, setStateList] = useState<IState[]>()
//     const [countryCode, setCountryCode] = useState("")

//     useEffect(() => {
//         setCountryList(Country?.getAllCountries())
//         setCountryCode(Country?.getAllCountries().find(country => country.name == userData.country)?.isoCode || "")
//     }, [])
//     useEffect(() => {
//         setStateList(State?.getStatesOfCountry(String(countryCode)))
//     }, [countryCode])

//     const countryOptions = countryList?.map(country => ({ value: country?.name, label: country.name, code: country?.isoCode }))
//     const stateOptions = React.useMemo(() => {
//         return stateList?.map(state => ({
//             value: state?.name,
//             name: state.name,
//             code: state?.isoCode
//         }));
//     }, [stateList, countryCode]);


//     //////////////////////////////////////////////////////////////////////
//     ///////                  HANDLE SUBMIT FORM                    ///////
//     //////////////////////////////////////////////////////////////////////
//     const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//         try {

//             const userData = {
//                 address: data.address,
//                 desired_role: data.desired_role,
//                 years_of_experience: data.years_of_experience,
//                 stack: data.stack.split(','),
//                 job_type: data.job_type,
//                 currently_employed: data.currently_employed,
//                 willing_to_relocate: data.willing_to_relocate,
//             };

//             onBoardTalent(userData, {
//                 onSuccess: (response) => {
//                     window.postMessage('userTypeChange', window.location.href);
//                     clearStorage()
//                     onDetailsSubmit(data);
//                 }
//             });
//         } catch (error: any) {
//             console.error('An error occurred:', error.response);
//         }
//     };






//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col py-4 transition-transform",
//             slide == "stagnant" ? "translate-x-[110%]" :
//                 slide == "in" ? "translate-x-0 duration-300" :
//                     slide == "out" ? "translate-x-[-120%] duration-500" : "")}
//         >
//             <header className='flex flex-col self-start '>
//                 <h1 className=' text-3xl md:text-[2.35rem] text-white font-clash font-medium'>
//                     Let&apos;s help set up your <br className='max-xs:hidden lg:max-xl:hidden' /> profile
//                     <span className='inline-block items-center justify-center text-lg bg-white/20 px-4 py-0.5 rounded-lg ml-2.5 translate-y-[-1.5px]'>
//                         2/2
//                     </span>
//                 </h1>
//                 <p className="text-[#BCBCBC] text-sm md:font-base mt-1 mb-6">
//                     Kindly complete your profile setup as this would help employers get a quick knowledge of your when you profile is viewed
//                 </p>
//             </header>


//             <div className="inputdiv transparent !my-2">
//                 <label className='!text-white' htmlFor="address">Home address</label>
//                 <input type="text" placeholder="Enter address" className={cn(errors.address && "error",)} {...register('address')} id="address" />
//             </div>

//             <div className="flex flex-col ">
//                 <label className='text-white text-sm'>Current Location</label>
//                 <div className="grid w-full flex-col sm:grid-cols-2 items-center sm:gap-4">
//                     <SelectSingleCombo
//                         name='country'
//                         placeholder="Select Country"
//                         value={watch("country")}
//                         onChange={(val) => {
//                             setValue("country", val!)
//                             const chosen = countryOptions && countryOptions.filter((country) => country.value.toLowerCase() == val.toLocaleLowerCase())[0]
//                             setValue("country", chosen?.value!)
//                             countryOptions && setCountryCode(chosen?.code!)
//                         }}
//                         containerClass='!my-2 transparent'
//                         itemClass='text-xs'
//                         options={countryOptions!}
//                         valueKey='value'
//                         triggerColor='white'
//                         transparent
//                     />

//                     <SelectSingleCombo
//                         name='state'
//                         placeholder="Select state"
//                         value={watch("state")}
//                         valueKey='value'
//                         onChange={(val) =>
//                             setValue("state", val)
//                         }
//                         containerClass='!my-2 transparent'
//                         itemClass='text-xs'
//                         options={stateOptions}
//                         isLoadingOptions={!stateOptions || watch('country') == undefined}
//                         triggerColor='white'
//                         transparent
//                     />
//                 </div>
//             </div>

//             <div className="inputdiv transparent !my-2">
//                 <label className='!text-white' htmlFor="desired_role">What best describes your desired role?</label>
//                 <input type="text" placeholder="Enter desired role" className={cn(errors.desired_role && "error",)} {...register('desired_role')} id="desired_role" />
//             </div>

//             <Select
//                 name={`years_of_experience`}
//                 triggerColor='white'
//                 value={watch(`years_of_experience`)}
//                 onChange={(value) => setValue('years_of_experience', value)}
//                 className={cn(watch(`years_of_experience`) == undefined && "!text-white/60")}
//                 options={work_experiences}
//                 label='Work experience in the stated role'
//                 labelClass='!text-white'
//                 itemClass='text-xs'
//                 placeholder="Select years of experience"
//                 errors={errors}
//                 containerClass='!my-2 transparent'
//                 fullWidth
//             />

//             <div className="inputdiv transparent !my-2 text-white">
//                 <label className='!text-white' htmlFor="stack">What is your stack? (comma-separated)</label>
//                 <input type="text" placeholder="e.g. HTML, CSS, Javascript" className={cn(errors.stack && "error",)} {...register('stack')} id="stack" />
//             </div>


//             <Select
//                 name={`job_type`}
//                 triggerColor='white'
//                 value={watch(`job_type`)}
//                 onChange={(value) => setValue('job_type', value)}
//                 className={cn(watch(`job_type`) == undefined && "!text-white/60")}
//                 options={job_type}
//                 label='Employment type'
//                 labelClass='!text-white'
//                 itemClass='text-xs'
//                 placeholder="Select job employment type"
//                 errors={errors}
//                 containerClass='!my-2 transparent'
//                 fullWidth
//             />


//             <RadioGroup
//                 options={currently_employed}
//                 onChange={(value) => setValue('currently_employed', value)}
//                 label="Are you currently employed?"
//                 labelClass='!text-white'
//                 containerClass='!my-2'
//                 errors={errors}
//                 value={watch('currently_employed')}
//                 name='job_type'
//                 variant="offwhite"
//                 size='small'
//                 arrangement='row'
//             />
//             <RadioGroup
//                 options={willing_to_relocate}
//                 onChange={(value) => setValue('willing_to_relocate', value)}
//                 label="Are you willing to relocate?"
//                 labelClass='!text-white'
//                 containerClass='!my-2'
//                 errors={errors}
//                 value={watch('willing_to_relocate')}
//                 name='job_type'
//                 variant="offwhite"
//                 size='small'
//                 arrangement='row'
//             />



//             <button className="flex items-center justify-center w-full mt-12 bg-white disabled:bg-primary-light py-2 px-3 rounded-lg text-primary text-center" type="submit" disabled={!isDirty}>
//                 <span className='flex items-center justify-center flex-1 grow gap-x-2 text-sm md:text-[1.05rem] text-secondary-dark font-medium mx-auto'>Create Profile {isOnboardingTalent && <LoaderBtn />}</span>
//                 <span className='flex items-center shrink justify-center ml-auto bg-primary rounded-full w-9 h-9'><RightUpArrow height={14} width={14} className='translate-y-0.5' /></span>
//             </button>




//             <ErrorModal
//                 isErrorModalOpen={isErrorModalOpen}
//                 setErrorModalState={setErrorModalState}
//                 subheading={
//                     errorModalMessage || 'Please check your inputs and try again.'
//                 }
//             >
//                 <div className="flex gap-3 rounded-2xl bg-red-50 px-8 py-6">
//                     <Button
//                         className="grow bg-red-950 hover:border-red-950 hover:text-red-950 px-1.5 sm:text-sm md:px-6"
//                         type="button"
//                         onClick={closeErrorModal}
//                     >
//                         Okay
//                     </Button>
//                 </div>
//             </ErrorModal>

//             <LoadingOverlay isOpen={isOnboardingTalent} />
//         </form>
//     );
// };

// export default TalentDetailsForm;

import React from 'react'

const TalentSignupStep3OnboardingDetails = () => {
  return (
    <div>TalentSignupStep3OnboardingDetails</div>
  )
}

export default TalentSignupStep3OnboardingDetails