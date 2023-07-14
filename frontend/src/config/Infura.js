
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { Buffer } from 'buffer/';
import {REACT_APP_PROJECT_ID, REACT_APP_PROJECT_SECRET_KEY} from '@env'

const projectId = REACT_APP_PROJECT_ID; 
const projectSecretKey = REACT_APP_PROJECT_SECRET_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
    "base64"
)}`

export const subdomain = "https://ipfs.io";

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
});

export default client;