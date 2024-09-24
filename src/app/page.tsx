'use client'
import Main from "@/components/Main";
import { Provider } from "react-redux";
import store from "@/store/store";
import React, {useEffect, useState} from 'react'
import appriteService from '@/appwrite/configu'
import { useRouter } from 'next/navigation'
import { Container, PostCard } from '@/components'

export default function Home() {
  const [posts, setPosts]= useState([])
  useEffect(()=>{
    appriteService.getAllPosts([]).then((posts)=>{
      if (posts){
          setPosts(posts.documents)
      }
  })  
  },[])    
  
  return (
    <Provider store={store}>    
    <div className="w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Main />
    </div>
    </Provider>
  )
}
