'use client'
import React,{useEffect, useState} from 'react'
import { useAppSelector } from '@/lib/hooks'
import { redirect } from 'next/navigation'

function AuthLayout({children, authentication=true}:
    {children:any, authentication:boolean}) {
    const [loader,setLoader]=useState(true)
    const authStatus=useAppSelector( (state:any) => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication){
            redirect("/login")
        }
        else if (!authentication && authStatus !== authentication){
            redirect("/")
        }
        setLoader(false)
    },[authStatus, authentication])

    return (
    <div>
      
    </div>
  )
}

export default AuthLayout
