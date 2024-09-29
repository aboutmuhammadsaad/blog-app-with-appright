
import conf from '@/lib/config';
import { Client,Databases, ID, Storage, Query } from "appwrite";

interface createpost{
    title:string,
    slug:string,
    content:string,
    featuredImage:string,
    status:string, 
    userID:string
}

export class Serive{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client)  
        this.bucket = new Storage(this.client);  
    }

    async createPost({title,slug,content,featuredImage,status, userID}:createpost){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                }

            )
            
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost({title,slug,content,featuredImage,status}:createpost){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,  
                }

            )
            
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(slug:string){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true
            
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getPost(slug:string){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getAllPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
            
        } catch (error) {
            console.log(error);
            return false
        }

    }

    

}


const serive = new Serive();
export default serive