import fetch from 'node-fetch';
import "dotenv/config";

const headers = {
  'Accept':'application/json',
  'x-api-key':process.env.KEY
};

export async function getURL(modPackId) {
    const res = await fetch(`https://api.curseforge.com/v1/mods/${modPackId}/files`, {
        method: `GET`,
        headers
    });

    const serverPackId = (await res.json()).data.find(d => d.serverPackFileId).serverPackFileId;
    
    const serverPack = await fetch(`https://api.curseforge.com/v1/mods/${modPackId}/files/`+serverPackId, {
        method: `GET`,
        headers
    });

    return (await serverPack.json()).data.downloadUrl;
};