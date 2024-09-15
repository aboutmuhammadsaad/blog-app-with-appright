
interface obj{
    appwriteUrl:string,
    appwriteProjectID:string,
    appwriteDatabaseID:string,
    appwriteCollectionID:string,
    appwriteBucketID:string,
}
 
const conf:obj = {
    appwriteUrl: process.env.NEXT_PUBLIC_APPWRITE_URL as string,
    appwriteProjectID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
    appwriteDatabaseID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    appwriteCollectionID: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
    appwriteBucketID: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
} 

export default conf