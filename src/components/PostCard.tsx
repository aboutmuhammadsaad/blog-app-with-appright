import React from 'react'
import UploadService from "@/appwrite/upload"
import Link from 'next/link'
import Image from 'next/image'

function PostCard({slug, title, featuredImage}:
    {slug:string, title:string, featuredImage:string}) {
    
  return (
    <Link href={`/post/${slug}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <Image src={UploadService.getFilePreview(featuredImage)} 
                alt={title}
                className='rounded-xl' 
                />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard