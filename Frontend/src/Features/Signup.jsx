// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode"
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../Components/Darkmode';


const Signup = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const[showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    return ( 
        <div className='flex justify-center items-center h-screen overflow-hidden'>
            <div className='bg-[#13131313] bg-opacity-90 w-96 p-3 rounded-2xl shadow-2xl px-6'>
              <div className="fixed top-4 right-4">
                <DarkModeToggle />
              </div>
                <h1 className='text-4xl font-bold mb-4 text-center text-slate-300'>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor="name" className='block text-gray-300'>Name</label>
                        <input type="text" 
                        placeholder='Enter your name' 
                        autoComplete='off' id="name" 
                        value={name} 
                        className='w-80 p-2 border border-gray-300 bg-transparent rounded mt-1 text-sm' 
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="email" className='block text-gray-300'>Email</label>
                        <input type="email" 
                        placeholder='Enter your email' 
                        autoComplete='off' id="email" 
                        value={email} 
                        className='w-80 p-2 border border-gray-300 bg-transparent rounded mt-1  text-sm' 
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                        <label htmlFor="password" className='block text-gray-300'>Password</label> 
                        <div 
                        onClick={() => setShowPassword(!showPassword)}
                        className='relative flex items-center rounded border-gray-300  mt-1'
                        >
                        <input 
                            type={showPassword ? 'password' : 'text'}
                            placeholder='Enter your password'
                            autoComplete='off'
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded bg-transparent mt-1 text-sm' 
                        />
                        <div className='absolute right-2'>
                            {showPassword ? <FiEyeOff className='text-'/> : <FiEye />}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className='block text-gray-300'>Confirm Password</label> 
                        <div 
                        onClick={() => setShowPassword(!showPassword)}
                        className='relative flex items-center rounded border-gray-300  mt-1'
                        >
                        <input 
                            type={showPassword ? 'password' : 'text'}
                            placeholder='Enter your password'
                            autoComplete='off'
                            id="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded bg-transparent mt-1 text-sm' 
                        />
                        <div className='absolute right-2'>
                            {showPassword ? <FiEyeOff className='text-'/> : <FiEye />}
                        </div>
                    </div>
                    </div>
                    <div className='flex justify-center'>
                        <button type="submit" 
                        className='w-56 bg-[#687eff] hover:bg-[#131313] text-white px-4 py-3 rounded animate-bounce shadow-2xl shadow-slate-900 mt-8'>
                            Sign Up</button>
                    </div>
                </form>
                <div className='text-center mt-4'>
                    <Link to='/login' className=' text-black text-xs leading-[1] hover:text-white'>Already have an account?</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Signup;
 