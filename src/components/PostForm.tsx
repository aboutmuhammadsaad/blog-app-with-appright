import React, {useState, useCallback, use} from 'react'
import { useForm } from 'react-hook-form'
import {Button ,Input, Logo,RTE, Select } from "@/components/index"
import appriteService from "@/appwrite/configu"
import appriteUpload from "@/appwrite/upload"
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'  

function PostForm({post}:any) {
    const {register, handleSubmit, watch, setValue, control, getValues } =useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    })
    const userData=useSelector((state:any)=>state.auth.userData)
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
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appriteUpload.getFilePreview(post.featuredImage)}
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
                <Button text={post ? "Update" : "Submit"} type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full"
                />
            </div>
        </form>
  )
}

export default PostForm
