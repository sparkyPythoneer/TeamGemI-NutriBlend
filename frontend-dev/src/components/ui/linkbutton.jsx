import Link, { LinkProps } from 'next/link';
import * as React from 'react';

import { cn } from '@/utils/classname';

import { buttonVariants } from './button';


const LinkButton = (
    ({ className, variant, size, icon, href, ...props }, ref) => {
        return (
            <Link
                href={href}
                {...props}
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
            >
                <div className="flex items-center justify-center gap-2 w-full h-full">
                    {icon && <span className={cn(iconvar[variant ? variant  : "default"], 'rounded-[0.67rem]')} >{icon}</span>}
                    {props.children}
                </div>
            </Link>
        );
    }
);
LinkButton.displayName = 'LinkButton';

export default LinkButton;