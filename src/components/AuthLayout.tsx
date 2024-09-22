import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'

function AuthLayout({children, authentication=true}:
    {children:any, authentication:boolean}) {
    const [loader,setLoader]=useState(true)
    const authStatus=useSelector( (state:any) => state.auth.status)

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
