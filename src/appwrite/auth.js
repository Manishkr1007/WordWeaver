// AuthService.js
import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)  // Appwrite API endpoint
            .setProject(conf.appwriteProjectId);  // Project ID
        this.account = new Account(this.client);
    }

    // Method to create a new user account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            // Automatically log in the user after creating an account
            return userAccount ? this.login({ email, password }) : userAccount;
        } catch (error) {
            console.error("Error creating account: ", error.message);
            throw error;  // Rethrow the error for further handling
        }
    }

    // Method to log in a user
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.error("Error logging in: ", error.message);
            throw error;  // Rethrow the error for further handling
        }
    }

    // Method to get the current logged-in user's data
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Error fetching current user: ", error.message);
            return null;  // Return null if there's an error
        }
    }

    // Method to log out the current user
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Error during logout: ", error.message);
        }
    }
}

const authService = new AuthService();
export default authService;
