"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '@/utils/classname';
import { convertKebabAndSnakeToTitleCase } from '@/utils/strings';
import Link from 'next/link';
import React from 'react';

const NavTabs = ({ categoryArray, fallback, currentTab, setCurrentTab, sideButton, listClass, sectionType = "components", triggerClass, activetriggerClass }) => {

    return (
        <Tabs defaultValue={currentTab || fallback} className='relative grid h-max mb-2 md:mb-4'>
            <div className={cn('sticky top-0 flex items-center justify-between gap-x-2 lg:gap-4 overflow-x-scroll ')} >
                <TabsList
                    className={cn("grow flex items-start justify-start gap-2.5 max-md:max-w-full overflow-x-auto bg-black/20 backdrop-blur-lg rounded-lg bg-none [scrollbar-width:none]  w-full !p-0 !m-0 !h-max", listClass)}
                >

                    {categoryArray?.map((cat,) => {
                        const { title, link, id, badge } = cat

                        return (

                            <React.Fragment key={`${id}${title}`}>
                                {
                                    (sectionType === "routes" && link) ?

                                        <Link
                                            href={link}
                                        >
                                            <TabsTrigger
                                                className={
                                                    cn(
                                                        'taboption relative min-w-[6rem] flex-1 transition-all duration-500 md:min-w-[5rem] md:max-w-max',
                                                        'rounded-full py-1.5 lg:py-2 md:rounded-[0.625rem] md:px-4 lg:px-7',
                                                        'text-xs font-normal leading-5 sm:text-base xs:text-sm text-white/60',
                                                        'focus:outline-none active:outline-none',
                                                        link.replace(/^\.\//, '') === currentTab.toLowerCase() ? 'active' : 'taboption', triggerClass
                                                    )
                                                }
                                                value={`${link.replace(/^\.\//, '')}`}
                                            >
                                                <span className='flex items-center gap-3'>

                                                    {title}
                                                    {
                                                        badge &&
                                                        <span className='flex items-center justify-center bg-primary-light-hover text-primary text-xs font-semibold rounded-full h-5 w-5'>{badge}</span>

                                                    }
                                                </span>
                                            </TabsTrigger>
                                        </Link>

                                        :


                                        <TabsTrigger
                                            key={`${id}${title}`}
                                            className={
                                                cn(
                                                    'taboption relative min-w-[6rem] flex-1 transition-all duration-500 md:min-w-[5rem] md:max-w-max',
                                                    'rounded-full py-1.5 lg:py-2 md:rounded-[0.625rem] md:px-4 lg:px-7',
                                                    'text-xs font-normal leading-5 sm:text-base xs:text-sm text-[#3E3873]',
                                                    'focus:outline-none active:outline-none',
                                                    title === currentTab ? 'active' : 'taboption',
                                                    triggerClass,
                                                    title === currentTab && activetriggerClass
                                                )
                                            }
                                            value={title}
                                            onClick={() => { if (setCurrentTab) { setCurrentTab(title) } }}
                                        >
                                            <span className='flex items-center gap-3'>
                                                {convertKebabAndSnakeToTitleCase(title)}
                                                {
                                                    badge &&
                                                    <span className='flex items-center justify-center bg-primary-light-hover text-primary text-xs font-semibold rounded-full h-5 w-5'>{badge}</span>
                                                }
                                            </span>
                                        </TabsTrigger>
                                }
                            </React.Fragment>
                        );
                    })}
                </TabsList>

                <span className='max-md:hidden'>
                    {
                        sideButton && sideButton
                    }
                </span>
            </div>


            {
                categoryArray?.map((cat) => {
                    const { link, id, component, title, } = cat;
                    return (
                        <React.Fragment key={`${id}${link}`}>
                            {
                                link ?
                                    <TabsContent className="relative !mt-0 md:mt-2 w-full overflow-y-scroll" value={link?.replace(/^\.\//, '')} key={`${id}${link}`}>
                                        {link?.replace(/^\.\//, '') === currentTab.toLowerCase() && component}
                                    </TabsContent>
                                    :
                                    <TabsContent className="relative !mt-0 md:mt-2 w-full overflow-y-scroll" value={title} key={`${id}${title}`}>
                                        {title === currentTab && component}
                                    </TabsContent>

                            }
                        </React.Fragment>
                    );
                })
            }
        </Tabs>

    )
}

export default NavTabs