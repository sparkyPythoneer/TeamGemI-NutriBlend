import { cn } from '@/utils/classname'
import React from 'react'
import { Spinner } from '.'

const LoadingOverLay = ({ isOpen }) => {
    return (
        <div className={cn(isOpen ? "" : "hidden", "fixed h-screen w-screen flex items-center justify-center bg-black/70 backdrop-blur-xl")}>
            <Spinner />
        </div>
    )
}

export default LoadingOverLay