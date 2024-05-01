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
import { formatRecipe } from '@/utils/fns'

const ChatDashboard = () => {
    const { setUserData, userData, UserId } = useCustomerDetailsStore();
    const { mutate: startAIChat } = useStartChat()
    const [message, setMessage] = useState('')
    const [AIResponse, setAIResponse] = useState({})


    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message || message.trim() == "") { toast.error('Please enter a valid message'); return }
        if (message.trim().length < 5) { toast.error('Please enter at least 5 characters in your message'); return }
        try {
            startAIChat({ user_message: message },

                {
                    onSuccess: (response) => {
                        console.log('response', response)
                        console.log(formatRecipe(response[1].content))
                        setAIResponse(formatRecipe(response[1].content) || response[1].content)
                    }
                })
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
                            <ArrowRight className=' text-white' />
                        </span>
                    </div>
                </form>
            </section>

            <section className=' justify-center p-5' >
                {
                    typeof AIResponse === 'string' && <div className="max-w-3xl mx-auto !bg-white/20 backdrop-blur-lg rounded-lg shadow-md overflow-hidden">
                        <h2 className="text-3xl font-semibold text-center text-white p-6">AI Response</h2>
                        <div className="p-6">
                            <p className="text-xl text-white">{AIResponse}</p>
                        </div>
                    </div>
                }
                <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-lg rounded-lg shadow-md overflow-hidden">
                    <h2 className="text-3xl font-semibold text-center text-white p-6">{AIResponse?.title}</h2>
                    <div className="p-6">
                        <p className="text-xl text-white">Cuisine Type: {AIResponse?.cuisine_type}</p>
                        <p className="text-xl text-white">Meal Category: {AIResponse?.meal_category}</p>
                        <p className="text-xl text-white">Cooking Time: {AIResponse?.cooking_time}</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-white">Ingredients:</h3>
                        <ul className="list-disc pl-6">
                            {typeof AIResponse?.ingredients}
                            {
                                typeof AIResponse?.ingredients == 'object' && Object.entries(AIResponse?.ingredients)?.map((ingredient, index) => {
                                    console.log(ingredient)
                                    return (
                                    <li key={index}>{ingredient[1]?.quantity} {ingredient[1]?.name}</li>
                                )})
                            }
                        </ul>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-white">Steps:</h3>
                        <ol className="list-decimal pl-6 text-xl">
                            {AIResponse?.steps?.map((step, index) => (
                                <li key={index} className='text-white font-normal'>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>



            </section>
        </div>
    )
}

export default ChatDashboard