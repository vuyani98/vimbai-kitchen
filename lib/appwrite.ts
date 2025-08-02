import { DbUser } from '@/type';
import { Account, Avatars, Client, Databases, ID, Query, Storage} from 'appwrite';
import process from 'process';



interface UserInfo {
    name: string,
    email: string,
    password: string,

}

export const appwriteConfig ={
    endpoint : process.env.REACT_APP_EXPO_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
    //platforrm : "com.hillsidedams.vimbaikitchen",
    projectId: process.env.REACT_APP_EXPO_PUBLIC_APPWRITE_PROJECT_ID || '688303be0005abab4d5e',
    databaseId: '6883a2180006448b9853',
    userCollectionId: '68874a2d00238bca4bdb'
}

export const client = new Client();
client 
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)

export const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);

export const createUser = async({name, email, password}: UserInfo) =>{

    console.log('create User was called');
    console.log(appwriteConfig.projectId)

    //try create a new account and write in the db
    try {

        const newAccount = await account.create( ID.unique(), email, password, name);
        
        console.log(newAccount)

        if (!newAccount) throw new Error('Failed to create account')

        console.log('New account email: ', email);

        //writing to db
        return await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
            ID.unique(),
            {
                email,
                name,
                accountId: newAccount.$id,                
            }
        );

    }

    catch (err) { 
        //console.log('error is: ', err);
        throw err as string;
    }

}

export const signIn = async({email, password}: any) => {

    try {
        const session = await account.createEmailPasswordSession(email, password);
        //console.log('Here is a session:',session)
        const userId: string = session.userId;
        const currentUserArray = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [ Query.startsWith('accountId', userId)]
        ); 

        const currentUser = currentUserArray.documents[0];

        localStorage.setItem("user", JSON.stringify(currentUser));

        return currentUser as DbUser;

    }

    catch (error) {
        //console.error('Error signing in:', error);
        throw error as string;
    }

}


export const getCurrentUser = async () => {

    try {
        
        const currentSession = await account.getSession('current');
        //const currentAccount = await account.get();

        if (!currentSession) {
            console.log('No account')
            throw new Error
        }

        const currentUser = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
           [ Query.startsWith('accountId', currentSession.userId)]
        )

        if (!currentUser) {
            console.log('No user')
            throw new Error
        }

        console.log(currentUser.documents[0])
        return currentUser.documents[0] as DbUser;

    }

    catch (error) {
        //console.log('Error getting user:', error);
        throw error as string;
    }

}

export const logout = async () => {

    try {

        console.log('logout funct called')
        const currentSession = await account.getSession('current');
        const sessionId = currentSession.$id;

        const result = await account.deleteSession(sessionId);

        if (!result) {
            throw new Error('error logging out');
        }

        return { "message" : 'success'}

    }

    catch (error) {
        console.log(error);
        throw error as string;
    }
}

export const getImageUrl = async () => {
    
}