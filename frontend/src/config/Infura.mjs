
import 'dotenv/config'
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const projectId = process.env.REACT_APP_PROJECT_ID; 
const projectSecretKey = process.env.REACT_APP_PROJECT_SECRET_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
    "base64"
)}`

// export const subdomain = "https://ipfs.io";

export const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
});
