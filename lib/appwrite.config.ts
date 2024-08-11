import * as sdk from 'node-appwrite'

export const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    THEREE_COLLECTION_ID,
    TERMIN_COLLECTION_ID,
    NEXT_COLLECTION_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT,
} = process.env

const client = new sdk.Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66aea8e7000af4ead09f')
    .setKey('21c2dfe4378037391eb26b9072e4e3892e9864983a9e912b1a3ec598cd27a900a8ba7290c61bb6ff17e97d9016cf57e0524bcac55c3f9f0a21668e5c48a384d913bcd32ed3fbc4e5122d0ad3ccde3eef222739fff67da1285b85159a489ffdf60d0fab680cab9688c55659c9076810284e29758de1654f5bd9a477ad54c9967d');

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);