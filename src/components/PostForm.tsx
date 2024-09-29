'use client'
import React, {useState, useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button ,Input, Logo,RTE, Select } from "@/components/index"
import appriteService from "@/appwrite/configu"
import appriteUpload from "@/appwrite/upload"
import { useAppSelector } from '@/lib/hooks'
import { redirect } from 'next/navigation'
import Image from 'next/image'  
type FormValues = {
    title: string;
    slug: string;
    content: string;
    status: string;
    featuredimage: FileList;
};

function PostForm({post}:any) {

    const {register, handleSubmit, watch, setValue, control, getValues } =useForm<FormValues>({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })
    const url =appriteUpload.getFilePreview(post.featuredImage)
    const userData=useAppSelector((state:any)=>state.auth.userData)
    const submit= async (data:any)=>{
        if (post) {
            const file = data.image[0] ? await appriteUpload.uploadFile(data.image[0]) : null;

            if (file) {
                appriteUpload.deleteFile(post.featuredImage);
            }

            const dbPost = await appriteService.updatePost({
                slug: post.$id,
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                redirect(`/post/${dbPost.$id}`);
            }
        }else{
            const file =await appriteUpload.uploadFile(data.image[0]);
            
            if (file){
                const fileId=file.$id
                data.featuredImage = fileId
                const dbPost = await appriteService.createPost({
                    ...data,
                    userID:userData.$id,
                })
                if (dbPost){
                    redirect(`/post/${dbPost.$id}`)
                }
            }
        }
        const slugTransform = useCallback((value:any) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    }
    const slugTransform = useCallback((value:any) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
  return (
   <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredimage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <Image
                            src={url.toString()}
                            alt={post.title}
                            className="rounded-lg"
                        />
                             
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"         
                    {...register("status", { required: true })}
                />
                <Button text={post ? "Update" : "Submit"} type="submit" className="w-full" bgColor={post ? "bg-green-500" : undefined} 
                />
            </div>
        </form>
  )
}

export default PostForm
