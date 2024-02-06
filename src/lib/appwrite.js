import { Account, Client, Databases } from 'appwrite';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public'
const client = new Client();

client
    .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
    .setProject(PUBLIC_APPWRITE_PROJECT);

const account = new Account(client);
const databases = new Databases(client);

export const appwrite = {
    client,
    account,
    databases,
};


