
import { useEffect,useState } from "react";
import {useDispatch} from 'react-redux'
import authService from "@/appwrite/auth";
import{login ,logout} from '@/store/authslice'
import Header from "./header/Header";

function Main() {
    const [loading,setloading] = useState(true)
  const dispatch = useDispatch();
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
