import { Models } from "appwrite";

export interface DbUser extends Models.Document {
    name: string;
    email: string;
    role: any
}
