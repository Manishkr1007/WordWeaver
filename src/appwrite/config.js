import conf from "../conf/conf.js"
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";
import axios from "axios";

// const fileId = 658a8aa186a3b7bfed56;



export class Service {
    client = new Client();
    databases;
    bucket;
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
        this.account = new Account(this.client)
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Appwrite service :: getPost() :: ", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const data = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
            console.log(data)
            return data;
        } catch (error) {
            console.log("Appwrite service :: getPosts() :: ", error);
            return false
        }
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            console.log(title, slug, content, featuredImage, status, userId);
            const res = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, {
                title,
                content,
                featuredimage: featuredImage,
                status,
                userid: userId
            }
            )
            // console.log(res);
            return res;
        } catch (error) {
            console.log("Appwrite service :: createPost() :: ", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updateDocument() :: ", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteDocument() :: ", error);
            return false
        }
    }

    // storage service



    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile() :: ", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId

            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: ", error);
            return false
        }
    }
    async getFilePreview(fileId) {
        // console.log(fileId);
        const data = await this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
        // console.log(data, "data");
        return data;
    }

    async fetchUserData(userId) {
        try {
          
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, [Query.equal("userid", userId)])
        } catch (error) {
            console.log("Appwrite service :: fetchUserData() :: ", error);
            return false
        }
    }
    
}


const service = new Service()
export default service;

