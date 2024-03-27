// gitBackup.ts
import fs from 'node:fs';
import path from 'path';
import { Context, Repos } from './lib/types'
import { JSONFilePreset } from 'lowdb/node';
import { upgradeConfig } from './lib/upgradeConfig'


export async function upgradeReposDatabase(rootDir: string, maxDepth: number): Promise<void> {
    let defaultData: Repos = {};
    await JSONFilePreset('db.json', defaultData)
        .then(db => upgradeConfig(db))

        .then(ctx => console.log('\r\n\r\n', 'Upgrading Done! Check the ' + ROOT_DIR + ' file for the results.'))
        .catch(err => console.error('\r\n\r\n', 'Error：', err))
}

const ROOT_DIR = ['C:\\AppData', 'G:'].filter(val => fs.existsSync(val))[0];
const MAX_DEPTH = 5;

(async () => {
    console.log(``)
    console.log(``)
    console.log(' ', '', '', '',)
    console.log(`Starting: target:${ROOT_DIR}`)

    if (!ROOT_DIR) {
        console.error('not find target folder, please set it and retry again')
    }
    await upgradeReposDatabase(ROOT_DIR, MAX_DEPTH);
})();