'use client'

import Image from 'next/image';

import { CustomerSlideshow, CustomerSignInFlow } from '../../misc/components/consumer';



export default function CustomerSignInFlowLayout() {
  return (
    <div className="w-screen flex flex-col-reverse lg:grid lg:max-xl:grid-cols-[0.9fr,1fr] xl:grid-cols-2 h-screen justify-between overflow-auto bg-[#042100]  md:pb-0">
      <CustomerSlideshow />


      <section className="grow flex items-center justify-center relative px-4 pb-0 lg:m-0 lg:py-0 lg:flex lg:basis-1/2 lg:flex-col lg:justify-center lg:overflow-y-auto  lg:[@media(min-height:520px)]:items-center max-lg:max-h-[78vh]">
        <CustomerSignInFlow />

        <div className="absolute inset-y-0 left-[-10%] right-0 lg:fixed lg:left-auto lg:max-xl:w-[51.75vw] lg:w-[50vw]" aria-hidden>
          <Image
            alt="Job queue"
            blurDataURL="eDI4z}~TIW_49a]yyD=_Ip%N00nh%MogxtI[^iS$of9ajDxaNexCoz"
            className="w-full object-cover object-bottom"
            placeholder="blur"
            sizes="100vw"
            src="/assets/auth-page/auth-page-bg.jpg"
            fill
          />
          <div className='absolute inset-0 -scale-x-100 !bg-black from-[#000401] from-[-3.89%] to-[#2b6759] to-[108.49%] bg-gradient-[262deg] opacity-75' /></div>
      </section>
    </div>
  );
}
