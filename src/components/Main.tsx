'use client'
import { useEffect,useState } from "react";
import {useAppDispatch} from '@/lib/hooks'
import authService from "@/appwrite/auth";
import{login ,logout} from '@/store/authslice'
import Header from "@/components/header/Header";
import appriteService from '@/appwrite/configu'
import {Button, Container, PostCard } from '@/components'


function Main() {
  const [loading,setloading] = useState(true)
  const dispatch = useAppDispatch();
  const [posts, setPosts]= useState<Document[]>([])
//   useEffect(()=>{
//     appriteService.getAllPosts().then((posts)=>{
//       if (posts){
//           setPosts(posts.documents)
//       }
//     })  
//   },[])
  
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setloading(false))
  }, [])
  return !loading ? (
    <>
      <Header/>    
      <div>A blog app</div>
    
    </>
    
  ):null;
}

export default Main
