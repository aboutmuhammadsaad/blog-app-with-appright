'use client'
import Link from 'next/link'
import React,{useEffect, useState} from 'react'
import appwriteService from '@/appwrite/configu'
import { Button , Container, PostCard } from '@/components'
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Image from 'next/image'

export default function Page({ params }: { params: { slug: string } }) {
    const [post, setPost] = useState(null);
    const userData =useSelector((state:any)=> state.auth.userData)
    const isAuthor = post && userData ? post.userid === userData.$id :false

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <Image
                        src={appwriteService.getFilePreview(post.featuredImage).toString()}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link href={`/edit-post/${post.$id}`}>
                                <Button className="mr-3 bg-green-500" text={"Edit"} />
                            </Link>
                            <Button text={"Delete"}className='bg-red-500' onClick={deletePost} />
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
    // ( 
    // <div>My Post: {params.slug}
    
    // </div>
)}
