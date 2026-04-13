import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'

import { Link } from "react-router-dom";


const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
})
const Login = () => {
  
     const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      })
    
     const onSubmit = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      data
    );
    console.log("Login Success:", res.data);
    localStorage.setItem("token", res.data.token);
   
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
  }
};
  return (
    <div className='h-screen bg-gray-700 flex justify-center items-center'>
    <form
    onSubmit={handleSubmit(onSubmit)}
     className='flex flex-col justify-center bg-white w-96  gap-4  p-4'> 
        <h1 className='text-2xl font-bold text-center'>Login</h1>
        <div className='flex flex-col '>
            <span className='font-medium'>Email:</span>
            <input 
            type='text'
            placeholder='Enter your email'
            className='border px-3 py-2 rounded'
             {...register("email")}
            />
             <p className='text-red-500 text-sm'>{errors.email?.message}</p>
        </div>
        <div className='flex flex-col '>
            <span className='font-medium'>Password:</span>
            <input 
            type='password'
            placeholder='Enter your password'
            className='border px-3 py-2 rounded'
            {...register("password")}
            />
             <p className='text-red-500 text-sm'>{errors.password?.message}</p>
        </div>
        <button className='py-2 bg-blue-500 text-white rounded w-full cursor-pointer'>Login</button>
        <span className='text-center  '>
            Don't have an account? <Link to='/signup' className='text-blue-500 hover:underline'>Signup</Link>
        </span>
    </form>
    </div>
  )
}

export default Login