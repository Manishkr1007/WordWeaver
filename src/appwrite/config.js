// Service.js
import conf from "../conf/conf.js";
import { Client, Databases, Storage, Account } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
        this.account = new Account(this.client);
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.log("Appwrite service :: getPost() :: ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const data = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
            return data;
        } catch (error) {
            console.log("Appwrite service :: getPosts() :: ", error);
            return false;
        }
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
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
            );
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
            );
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
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteDocument() :: ", error);
            return false;
        }
    }

    // Storage service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile() :: ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: ", error);
            return false;
        }
    }

    async getFilePreview(fileId) {
        const data = await this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
        return data;
    }

    // Fetch user data by user ID
    async fetchUserData(userId) {
        try {
            const user = await this.account.get(userId); 
            return user;
        } catch (error) {
            console.error("Appwrite service :: fetchUserData() :: ", error);
            return null; 
        }
    }

    async updateUserName(newName) {
    try {
        const user = await this.account.updateName(newName); 
        return user; 
    } catch (error) {
        console.error("Appwrite service :: updateUserName() :: ", error);
        return null; 
    }
}
}

const service = new Service();
export default service;
