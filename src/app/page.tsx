'use client'
import Main from "@/components/Main";
import authService from "@/appwrite/auth";
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
    const router = useRouter();
    const activeuser=useAppSelector((state:any) => state.status === 'true');   
    useEffect(() => {
        if (!activeuser){
            router.push('/login');
        }
        // const checkSession = async () => {
        //     try {
        //         const userData = await authService.getCurrentUser();
        //         if (!userData) {
        //             router.push('/login');
        //         }
        //     } catch (err) {
        //         console.log('Active session found');
        //     }
        // };
        // checkSession();
    }, [router]);    
  
  return (    
    <div className="w-full min-h-screen font-[family-name:var(--font-geist-sans)]">           
        <Main />
    </div>
  )
}
