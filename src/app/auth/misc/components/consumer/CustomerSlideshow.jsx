'use client';

import * as React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/utils/classname';

// import { Copy, GetLinkLogo, Home, MultipleUsers, Plane, Sheet } from '../../icons';





function CustomerSlideshow() {
    const [currentCustomerSlideshowIndex, setCurrentCustomerSlideshowIndex] = React.useState(0);

    const CustomerslideshowContent = [
        {
            heading: 'Showcase your skills',
            text: 'Create a compelling profile and showcase your skills, making it easy for recruiters to find and connect with you.',
            // icon: <Sheet />
        },
        {
            heading: 'Explore opportunities',
            text: 'Discover exciting job opportunities tailored to your skills and preferences, and take the next step in your career.',
            // icon: <Plane />
        },
        {
            heading: 'Engage in assessments',
            text: 'Participate in skill assessments to highlight your strengths and stand out as a top candidate for potential employers.',
            // icon: <MultipleUsers />
        },
        {
            heading: 'Manage applications',
            text: 'Efficiently track and manage your job applications, ensuring you stay organized throughout the hiring process.',
            // icon: <Copy />
        },

    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCustomerSlideshowIndex((prev) => (prev + 1) % CustomerslideshowContent.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);





    return (
        <div className="flex flex-col relative mx-auto w-full max-lg:h-[22vh] lg:shrink-0 overflow-hidden text-white lg:h-screen-small lg:max-w-none lg:basis-1/2 lg:pb-0 lg:[@media(max-height:520px)]:overflow-y-auto">
            <header className="flex top-0 left-0 z-[5] fixed lg:relative w-full items-center justify-between  py-4 px-6 md:py-6 md:px-10">
                <div className='flex items-center gap-3'>
                    {/* <GetLinkLogo stroke='white' /> */}
                    <h3 className='font-grotesk text-xl font-medium'>Nutriblend</h3>
                </div>

                <Link
                    className="flex items-center gap-2 px-4 py-2 text-base rounded-full bg-white/40 text-white hover:bg-white hover:text-primary transition-all"
                    href="/"
                >
                    {/* <Home /> */}
                    <span className='max-md:hidden'>
                        Home
                    </span>
                </Link>
            </header>

        
        </div>
    );
}

export default CustomerSlideshow