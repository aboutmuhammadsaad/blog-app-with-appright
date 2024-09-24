'use client'
import React,{useState} from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {login as authlogin} from "@/store/authslice"
import {Button ,Input, Logo } from "@/components/index"
import { useDispatch } from 'react-redux'
import authService from '@/appwrite/auth'
import {useForm} from "react-hook-form"

function SignUp() {
    const dispatch=useDispatch();
    const {register, handleSubmit}=useForm();
    const [error,setError]=useState('')
    const createAccount=async (data:any)=>{
        setError("")
        try {
            const userData=await authService.createAccount(data)
            if(userData){
                const userData=await authService.getCurrentUser()
                if (userData) dispatch(authlogin(userData))
                redirect("/")    
            }
        } catch (error:any) {
            setError(error)
        }
    } 
  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
                <Logo width="100%" />
            </span>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    href="/login"
                     className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(createAccount)}>
                <div className='space-y-5'>
                    <Input
                     label="Full Name: "
                     placeholder='Enter Full Name'
                     {...register("name",{
                        required: true,
                        validate: {
                            matchPattern:(value)=> /^[A-Za-z\s]+$/
                            .test(value) || "Enter a valid name.",
                        }
                     })}
                    />
                    <Input
                    label='Email: '
                    placeholder="Enter your email"
                    type='email'
                    {...register("email", {
                        required: true,
                        validate:{
                            matchPattern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
                            .test(value) || "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button text="Create Account" type="submit" className="w-full" />
                </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default SignUp
