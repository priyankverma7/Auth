import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Link } from "react-router-dom";


const validationSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
})

const Signup = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (data) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", data)
    console.log("Response:", res.data)  
    alert("Signup successful")
  } catch (error) {
    console.log("Error:", error.response?.data || error.message)
    alert("Signup failed")
  }
}

  return (
    <div className='h-screen bg-gray-700 flex justify-center items-center'>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-96 bg-white rounded-lg flex flex-col gap-4 p-6'
      >
        
        <h1 className='text-2xl font-bold text-center'>Signup</h1>

        
        <div className='flex flex-col w-full'>
          <label className='mb-1 font-medium'>Full Name</label>
          <input
            type='text'
            placeholder='Enter your full name'
            className='border px-3 py-2 rounded'
            {...register("fullName")}
          />
          <p className='text-red-500 text-sm'>{errors.fullName?.message}</p>
        </div>

        {/* Email */}
        <div className='flex flex-col w-full'>
          <label className='mb-1 font-medium'>Email</label>
          <input
            type='email'
            placeholder='Enter your email'
            className='border px-3 py-2 rounded'
            {...register("email")}
          />
          <p className='text-red-500 text-sm'>{errors.email?.message}</p>
        </div>

        {/* Password */}
        <div className='flex flex-col w-full'>
          <label className='mb-1 font-medium'>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            className='border px-3 py-2 rounded'
            {...register("password")}
          />
          <p className='text-red-500 text-sm'>{errors.password?.message}</p>
        </div>

        {/* Confirm Password */}
        <div className='flex flex-col w-full'>
          <label className='mb-1 font-medium'>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            className='border px-3 py-2 rounded'
            {...register("confirmPassword")}
          />
          <p className='text-red-500 text-sm'>{errors.confirmPassword?.message}</p>
        </div>

        {/* Button */}
        <button className='py-2 bg-blue-500 text-white rounded w-full cursor-pointer'>
          Signup
        </button>

        <span className='text-center'>
          Already have an account?{" "}
          <Link to='/login' className='text-blue-500'>
            Login
          </Link>
        </span>

      </form>
    </div>
  )
}

export default Signup