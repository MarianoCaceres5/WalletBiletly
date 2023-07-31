
// import '../../globals.js';
// import 'react-native-url-polyfill/auto.js'
let REACT_APP_PROJECT_ID = "2PTeXaWpD6pJoeAO7L7Up1eH9ID"
let REACT_APP_PROJECT_SECRET_KEY = "1bec7aa48ccc32e3fa7d63ae74ed2940"
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { Buffer } from 'buffer';
// import {REACT_APP_PROJECT_ID, REACT_APP_PROJECT_SECRET_KEY} from '@env'

const projectId = REACT_APP_PROJECT_ID; 
const projectSecretKey = REACT_APP_PROJECT_SECRET_KEY;
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
