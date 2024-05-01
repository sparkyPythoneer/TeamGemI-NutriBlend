"use client"

import { cn } from '@/utils/classname'
import React, { useState } from 'react'
import { displayFont } from '../../layout'
import { ArrowRight } from 'lucide-react'
import { getAccessToken } from '@/utils/tokens'
import useCustomerDetailsStore from '../../../context/userDetailsStore'
import { useStartChat } from './misc/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const ChatDashboard = () => {
    const { setUserData, userData, UserId } = useCustomerDetailsStore();
    const { mutate: startAIChat } = useStartChat()
    const [message, setMessage] = useState('')
    const [AIResponse, setAIResponse] = useState('')


    const router = useRouter()
    console.log(userData)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message || message.trim() == "") { toast.error('Please enter a valid message'); return }
        if (message.trim().length < 5) { toast.error('Please enter at least 5 characters in your message'); return }
        try {
            const response = startAIChat({ user_message: message })
            //router.push(response?.conversation)
            console.log(response)
            setAIResponse(response.data[1].ccontent)
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <div className='grid grid-rows-2 w-screen h-screen'>

            <section className='flex flex-col items-center justify-center p-5'>
                <h3 className={cn(displayFont.className, "text-5xl text-center lg:text-left max-w-2xl lg:text-6xl font-semibold mb-6")}>Hello {userData?.first_name},<br /> how can I help you eat healthy today?</h3>
                <form className='inputdiv real transparent  my-2' onSubmit={(e) => handleSubmit(e)}>
                    <div className='relative w-full'>
                        <input type="text" placeholder="start typing" className={cn("!bg-white/20 text-white placeholder:text-white/60",
                            "min-w-[50vw] w-[95%] max-w-[900px] px-6 py-5 pr-8 lg:!pl-8 lg:!pr-16 !text-2xl !rounded-full")} id="last_name"
                            value={message} onChange={(e) => setMessage(e.target.value)}
                        />
                        <span className='absolute right-[1%] top-[15%] bg-primary p-2 rounded-full cursor-pointer'>
                            <ArrowRight className=' text-background' />
                        </span>
                    </div>
                </form>
            </section>

            <section dangerouslySetInnerHTML={{ __html: AIResponse }}>
            </section>
        </div>
    )
}

export default ChatDashboard