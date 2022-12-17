import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { getURL } from './modules/index.js';
import 'dotenv/config';
import { execSync } from 'node:child_process';

const rl = readline.createInterface({ input, output });

rl.question(`Please enter the ID of the modpack, this can be found on the modpacks curseforge page. `, (packId) => {
    rl.question(`Where do you wish to install this modpack? `, async (installDir) => {
        const downloadUrl = await getURL(packId);
        execSync(`cd ${installDir} && wget "${downloadUrl}"`);
        const urlSplit = downloadUrl.split('/'),
        modpackFolder = urlSplit[urlSplit.length - 1].replace('.zip', '');
        execSync(`cd ${installDir} && unzip -o "${modpackFolder}"`);
        execSync(`cd ${installDir} && rm -drf "${modpackFolder}.zip"`);
        rl.close();
    });
});