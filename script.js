// script.js
const { NFTStorage, Blob } = require('nft.storage');
const fs = require('fs');

// Read API KEY from .env file
require("dotenv").config()
const API_KEY = process.env.API_KEY

// (1)
const client = new NFTStorage({ token: API_KEY });

async function main() {
    // (2)
    fs.readFile('cow.jpeg', "utf-8", async (err, data) => {
        if (err) throw err;

        const url = await store(data);
        console.log("Stored NFT successfully!\nMetadata URL: ", url);
    });
}

async function store(data) {
    // (3)
    const fileCid = await client.storeBlob(new Blob([data]));
    const fileUrl = "https://ipfs.io/ipfs/" + fileCid;
    console.log("Created file in IPFS at", fileUrl);

    // (4)
    const obj = {
        "attributes": [],
        "description": "Cow in IPFS",
        "image": fileUrl,
        "name": "cow.jpeg"
      };

    // (5)
    const metadata = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const metadataCid = await client.storeBlob(metadata);
    const metadataUrl = "https://ipfs.io/ipfs/" + metadataCid;

    return metadataUrl;
}

main();