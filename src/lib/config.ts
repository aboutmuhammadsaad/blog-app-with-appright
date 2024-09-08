interface obj{
    appwriteUrl:string,
    appwriteProjectID:string,
    appwriteDatabaseID:string,
    appwriteCollectionID:string,
    appwriteBucketID:string,
}
const conf:obj = {
    appwriteUrl: process.env.NEXTJS_APPWRITE_URL,
    appwriteProjectID: process.env.NEXTJS_APPWRITE_PROJECT_ID,
    appwriteDatabaseID: process.env.NEXTJS_APPWRITE_DATABASE_ID,
    appwriteCollectionID: process.env.NEXTJS_APPWRITE_COLLECTION_ID,
    appwriteBucketID: process.env.NEXTJS_APPWRITE_BUCKET_ID,
} 

export default conf