import { Account, Avatars, Client, Databases, ID, Query, Storage} from 'appwrite';

export const client = new Client();

export const appwriteConfig ={
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://appwrite.example.com/v1',
    platforrm : "com.hillsidedams.vimbaikitchen" ,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || 'my id'
}

export const account = new Account(client);
client 
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)

export { ID } from 'appwrite';
