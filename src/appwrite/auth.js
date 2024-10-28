import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (error) {
      console.error("Error creating account:", error.message);
      throw new Error(
        "Failed to create account. Please check your credentials."
      );
    }
    return null;
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw new Error(
        "Failed to log in. Please check your email and password."
      );
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getCurrentUser() :: ", error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("Appwrite service :: logout() :: ", error);
      return false;
    }
  }

  async resetPassword(email) {
    try {
      await this.account.createRecovery(
        email,
        "https://word-weaver-rho.vercel.app/reset-password"
      );
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  }

  async resetPasswordWithToken(userId, secret, newPassword) {
    try {
      await this.account.updatePassword(newPassword, secret);
      return true;
    } catch (error) {
      console.error("Error resetting password with token:", error);
      throw new Error("Failed to reset password. Please check your token.");
    }
  }
}

const authService = new AuthService();
export default authService;
