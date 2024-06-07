import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.jsm.mootour',
    projectId: '66427e020011ff21e84c',
    databaseId: '664280600036b54108d5',
    userCollectionId: '6642c8590028d0925234',
    motoCollectionId: '664280c4002eed3f3fed',
    agendamentoCollectionId: '664280f8000b1187c3fd',
    contratoCollectionId: '664285e20023aba24402',
    storageId: '664291800015bd30b478',
    comentarioCollectionId: '6644212e002de7002cb3'
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  motoCollectionId,
  comentarioCollectionId,
  agendamentoCollectionId,
  contratoCollectionId,
  storageId
} = config;

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error('Failed to create user: ' + error.message)
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if(!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export const getAllMotos = async () =>{
  try {
    const motos = await databases.listDocuments(
      databaseId,
      motoCollectionId
    )

    return motos.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getAllComentarios = async () =>{
  try {
    const comentarios = await databases.listDocuments(
      databaseId,
      comentarioCollectionId
    )

    return comentarios.documents;
  } catch (error) {
    throw new Error(error);
  }
}

