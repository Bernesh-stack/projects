import { ID, Query } from "appwrite";
import { appwriteConfig, account, databases, avatars } from "./config";
import { INewUser } from "@/types";

// ===============================================
// AUTH
// ===============================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
    );
    if (!newAccount) throw new Error("Account creation failed");

    // (Optional) Automatically sign in after sign-up if desired:
    // You can call signInAccount here if you want to immediately create a session.
    // e.g., await signInAccount({ email: user.email, password: user.password });

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log("Error in createUserAccount:", error);
    return error;
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL | string;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
    );
    return newUser;
  } catch (error) {
    console.log("Error in saveUserToDB:", error);
    return null;
  }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log("Error in signInAccount:", error);
    return null;
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log("Error in getAccount:", error);
    return null;
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    // First, try to get the current session.
    const session = await account.getSession("current");
    console.log("Active session:", session);

    // If we have a session, then get the account details.
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No active account");

    // Now, get the user document from your database.
    const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser || currentUser.documents.length === 0)
      throw new Error("User not found in DB");

    return currentUser.documents[0];
  } catch (error) {
    console.log("Error in getCurrentUser:", error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    await account.deleteSession("current");
    localStorage.removeItem("user");
  } catch (error) {
    console.log("Error in signOutAccount:", error);
  }
}
