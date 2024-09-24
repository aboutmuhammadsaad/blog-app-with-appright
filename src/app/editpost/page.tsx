import React, {useEffect, useState} from 'react'
import appriteService from '@/appwrite/configu'
import { useRouter } from 'next/navigation'
import { Container, PostCard } from '@/components'
import PostForm from '@/components/PostForm'

function page() {
    const [Post, setPosts] = useState(null)
    const router = useRouter()
    useEffect(()=>{
        appriteService.getAllPosts([]).then((Post)=>{
            if (Post){
                setPosts(Post)
            }
            else{
                router.push("/")
            }
        })    
    },[router])
    
  return Post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={Post} />
        </Container>
    </div>
  ):null 
}

export default page
