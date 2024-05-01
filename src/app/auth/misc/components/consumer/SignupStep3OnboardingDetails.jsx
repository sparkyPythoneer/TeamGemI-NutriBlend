"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Country, State, City, ICountry, IState } from 'country-state-city';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';


import { ErrorModal, Select, SelectComboSingle, SmallSpinner } from '@/components/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn, useOnboardNB } from '../../api';
import { useErrorModalState } from '@/hooks';
import { useCustomerRegisterDetails } from '../../store';
import { cn } from '@/utils/classname';
import { setAccessToken } from '@/utils/tokens';
import { ArrowRight, Check } from 'lucide-react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { allergies, diet_choices } from '@/constants';
import ComboBox from '@/components/shared/selectComboSingle';
import { displayFont } from '@/app/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';





const onboardForm = z.object({
    username: z.string({ required_error: 'Enter username.' }).min(1, { message: 'username is required' }),
    allergies: z.array(z.string()),
    country: z.string({ required_error: 'Please select country.' }),
    state: z.string({ required_error: 'Please select state.' }),
    dietary_preference: z.string({ required_error: 'Select dietary preference.' }),
});






const UserDetailsForm = ({ user, onDetailsSubmit }) => {
    const { userData, moveToNextStep, setUserData, clearStorage } = useCustomerRegisterDetails();
    const {
        isErrorModalOpen,
        setErrorModalState,
        closeErrorModal,
        openErrorModalWithMessage,
        errorModalMessage,
    } = useErrorModalState();





    const signIn = useSignIn();
    const { mutateAsync: onBoardTalent, isLoading: isOnboardingTalent } = useOnboardNB();
    const [slide, setslide] = useState("stagnant")

    useEffect(() => {
        const loginData = {
            email: user.email || userData.email,
            password: user.password || userData.email,
        }

        signIn.mutateAsync(loginData, {
            onSuccess: async (response) => {
                await setAccessToken(response?.data?.data.access)
            }
        });

        const timer = setTimeout(() => {
            setslide("in");
        }, 15);
        return () => clearTimeout(timer);
    }, []);






    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////                          FORM                    //////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    const { handleSubmit, register, formState: { errors, isDirty, isValid }, setError, control, watch, setValue } = useForm({
        defaultValues: {
            username: userData.username,
            dietary_preference: userData.dietary_preference,
            country: userData.country,
            state: userData.state,
            allergies: userData.allergies,
        },
        resolver: zodResolver(onboardForm)
    });

    //////////////////////////////////////////////////////////////////////
    ///////               SAVE INPUTS TO STORE                     ///////
    //////////////////////////////////////////////////////////////////////
    React.useEffect(() => {
        const subscription = watch((value) => {
            setUserData(value);
        });
        return () => subscription.unsubscribe();
    }, [watch, setUserData]);


    //////////////////////////////////////////////////////////////////////
    ///////               COUNTRY AND STATE SELECTION              ///////
    //////////////////////////////////////////////////////////////////////
    const [countryList, setCountryList] = useState()
    const [stateList, setStateList] = useState()
    const [cityList, setCityList] = useState()
    const [countryCode, setCountryCode] = useState("")

    useEffect(() => {
        setCountryList(Country?.getAllCountries())
        setCountryCode(Country?.getAllCountries().find(country => country.name == userData.country)?.isoCode || "")
    }, [])
    useEffect(() => {
        setStateList(State?.getStatesOfCountry(String(countryCode)))
    }, [countryCode])

    const countryOptions = countryList?.map(country => ({ value: country?.name, name: country.name, code: country?.isoCode }))
    const stateOptions = React.useMemo(() => {
        return stateList?.map(state => ({
            value: state?.name,
            name: state.name,
            code: state?.isoCode
        }));
    }, [stateList, countryCode]);


    //////////////////////////////////////////////////////////////////////
    ///////                  HANDLE SUBMIT FORM                    ///////
    //////////////////////////////////////////////////////////////////////
    const onSubmit = async (data) => {
        try {

            const userData = {
                username: data.username,
                desired_role: data.desired_role,
                years_of_experience: data.years_of_experience,
                stack: data.stack.split(','),
                job_type: data.job_type,
                currently_employed: data.currently_employed,
                willing_to_relocate: data.willing_to_relocate,
            };

            onBoardTalent(userData, {
                onSuccess: (response) => {
                    window.postMessage('userTypeChange', window.location.href);
                    clearStorage()
                    onDetailsSubmit(data);
                }
            });
        } catch (error) {
            console.error('An error occurred:', error?.response);
        }
    };






    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col py-4 transition-transform",
            slide == "stagnant" ? "translate-x-[110%]" :
                slide == "in" ? "translate-x-0 duration-300" :
                    slide == "out" ? "translate-x-[-120%] duration-500" : "")}
        >
            <header className='flex flex-col self-start '>
                <h1 className={cn(' text-3xl md:text-[2.35rem] text-white font-semibold', displayFont.className)}>
                    Let&apos;s help set up your <br className='max-xs:hidden lg:max-xl:hidden' /> profile
                    <span className='inline-block items-center justify-center text-lg bg-white/20 px-4 py-0.5 rounded-lg ml-2.5 translate-y-[-1.5px]'>
                        2/2
                    </span>
                </h1>
                <p className="text-[#BCBCBC] text-sm md:font-base mt-1 mb-6">
                    Kindly complete your profile setup to help us fine tune your experience.
                </p>
            </header>

            <div className='inputdiv transparent  my-2'>
                <label className='!text-white' htmlFor="last_name">Username</label>
                <input type="text" placeholder="Choose a username" className={cn(errors.username && "error", "!bg-white/20 text-white placeholder:text-white/60")} {...register('username')} id="username" />
                {errors.username && <p className='formerror'>{errors.username.message}</p>}
            </div>

            <div className="flex flex-col ">
                <label className='text-white text-sm'>Location</label>

                <div className="grid w-full flex-col sm:grid-cols-2 items-center sm:gap-4">
                    <Popover>
                        <PopoverTrigger>
                            <button className={cn("w-full bg-white/20 backdrop-blur-lg rounded-lg transition-colors px-3.5 py-2 sm:px-4 sm:py-3 mb-2 text-sm text-left", (watch("country")) ? "text-white" : "text-white/60")} type="button"   >
                                {
                                    watch("country") ? watch("country") : "Select Country"
                                }
                            </button>
                        </PopoverTrigger>

                        <PopoverContent>
                            <div className='flex flex-col max-h-96 overflow-y-scroll'>

                                {
                                    countryOptions && countryOptions.map((country) => (
                                        <button
                                            key={country.value}
                                            onClick={() => {
                                                setValue("country", country.value)
                                                setCountryCode(country.code)
                                            }}
                                            className='flex items-center justify-between w-full py-2 px-3 hover:bg- hover:text-primary rounded-lg text-primary text-center transition-colors'
                                        >
                                            <span className='text-left'>{country.value}</span>
                                            <span className={cn("", watch("country") === country?.value ? " opacity-100" : "opacity-0")}>
                                                <Check className='text-primary' />
                                            </span>
                                        </button>
                                    ))
                                }
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger>
                            <button className={cn("w-full bg-white/20 backdrop-blur-lg rounded-lg transition-colors px-3.5 py-2 sm:px-4 sm:py-3 mb-2 text-sm text-left", (watch("state")) ? "text-white" : "text-white/60")} type="button"   >
                                {
                                    watch("state") ? watch("state") : "Select State"
                                }
                            </button>
                        </PopoverTrigger>

                        <PopoverContent>
                            <div className='flex flex-col max-h-96 overflow-y-scroll'>

                                {
                                    stateOptions && stateOptions.map((state) => (
                                        <button
                                            key={state.value}
                                            onClick={() => {
                                                setValue("state", state.value)
                                                // setCountryCode(country.code)
                                            }}
                                            className='flex items-center justify-between w-full py-2 px-3 hover:bg- hover:text-primary rounded-lg text-primary text-center transition-colors'
                                        >
                                            <span className='text-left'>{state.value}</span>
                                            <span className={cn("", watch("state") === state?.value ? " opacity-100" : "opacity-0")}>
                                                <Check className='text-primary' />
                                            </span>
                                        </button>
                                    ))
                                }
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>


            <div className='flex flex-col trasparent my-2'>
            <label className='text-white text-sm'>Dietary Preference</label>

                <Popover>
                    <PopoverTrigger>
                        <button className={cn("w-full bg-white/20 backdrop-blur-lg rounded-lg transition-colors px-3.5 py-2 sm:px-4 sm:py-3 mb-2 text-sm text-left", (watch("dietary_preference")) ? "text-white" : "text-white/60")} type="button"   >
                            {
                                watch("dietary_preference") ?
                                    diet_choices.find(choice => choice.value == watch("dietary_preference"))?.name :
                                    "Select Dietary Preference"
                            }
                        </button>
                    </PopoverTrigger>

                    <PopoverContent>
                        <div className='flex flex-col max-h-96 overflow-y-scroll'>

                            {
                                diet_choices && diet_choices.map((dietary_preference) => (
                                    <button
                                        key={dietary_preference.value}
                                        onClick={() => {
                                            setValue("dietary_preference", dietary_preference.value)
                                            // setCountryCode(country.code)
                                        }}
                                        className='flex items-center justify-between w-full py-2 px-3 hover:bg- hover:text-primary rounded-lg text-primary text-center transition-colors'
                                    >
                                        <span className='text-left'>{dietary_preference.name}</span>
                                        <span className={cn("", watch("dietary_preference") === dietary_preference?.value ? " opacity-100" : "opacity-0")}>
                                            <Check className='text-primary' />
                                        </span>
                                    </button>
                                ))
                            }
                        </div>
                    </PopoverContent>
                </Popover>
            </div>



            <SelectComboSingle
                name='state'
                label="Allergies"
                placeholder="Select state"
                value={watch("allergies") || ""}
                valueKey='value'
                onChange={(val) =>
                    setValue("allergies", val)
                }
                containerClass='!my-2 transparent'
                itemClass='text-xs'
                options={allergies}
                triggerColor='white'
                transparent
            />




            <button className="bg-white flex items-center justify-center w-full disabled:bg-primary-light py-2 px-3 rounded-lg text-primary text-center disabled:cursor-not-allowed disabled:opacity-35 transition-colors " type="submit"
            >

                <span className='flex items-center justify-center gap-4 text-[0.95rem] text-secondary-dark font-medium mx-auto flex-1'>Create Profile {isOnboardingTalent && <SmallSpinner className='text-primary' />}</span>
                <span className='flex items-center justify-center ml-auto bg-primary rounded-full w-9 h-9'><ArrowRight className='text-white' /></span>
            </button>





            <ErrorModal
                isErrorModalOpen={isErrorModalOpen}
                setErrorModalState={setErrorModalState}
                subheading={
                    errorModalMessage || 'Please check your inputs and try again.'
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
            </ErrorModal>

            {/* <LoadingOverlay isOpen={isOnboardingTalent} /> */}
        </form>
    );
};

export default UserDetailsForm;

