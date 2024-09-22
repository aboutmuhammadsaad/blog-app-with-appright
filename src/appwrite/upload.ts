
import conf from '@/lib/config';
import { Client ,ID, Storage } from "appwrite";

class UploadService {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
          
        this.bucket = new Storage(this.client);  
    }

    async uploadFile(file:any){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async deleteFile(fileID:any){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileID
            )
            
        } catch (error) {
            console.log(error)
            return false
        }
    }
    
    getFilePreview(fileID:any){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,    
            fileID
        )
    }
}

const uploadservice = new UploadService
export default uploadservice