// gitBackup.ts
import fs from 'node:fs';
import path from 'path';
import { Context, Repos, Repo } from './lib/types'
import { JSONFilePreset } from 'lowdb/node';
import { extend } from './lib/utils'
import { factory } from './lib/factory';

async function restoreRepo(_ctx: Context) {
    return Object.entries(_ctx.db.data).map(async ([relativePath, repo]: [string, Repo]) => {

        if (relativePath == '__version') return;
        // todo: $dot$ to .
        let ctx = extend({}, _ctx, { rootDir: _ctx.rootDir, curDir: path.join(_ctx.rootDir, relativePath) });
        let p = factory.find(async p => await p.shouldRestore(ctx, repo));
        if (p) {
            // 定义一个GitRepo对象，用于存储git库的信息
            return await p.restoreRepo(ctx, repo)
        }
    })
}
export async function findAndBackupRepos(rootDir: string, maxDepth: number): Promise<void> {
    let defaultData: Repos = {};
    await JSONFilePreset('db.json', defaultData)
        // .then(db => upgradeConfig(db))
        .then(async db => {
            const ctx: Context = {
                curDir: rootDir,
                db,
                rootDir
            };
            return ctx;
        })
        .then(async ctx => {

            await restoreRepo(ctx)
            return ctx;
        })
        .then(ctx => console.log('\r\n\r\n', 'Done! Check the ' + ctx.rootDir + ' file for the results.'))
        .catch(err => console.error('\r\n\r\n', 'Error：', err))
}

const ROOT_DIR = ['C:\\ScriptsApplications\\test', 'G:\\test'].filter(val => fs.existsSync(val))[0];
const MAX_DEPTH = 5;

(async () => {
    console.log(``)
    console.log(``)
    console.log(' ', '', '', '',)
    console.log(`Starting: target:${ROOT_DIR}`)

    if (!ROOT_DIR) {
        console.error('not find target folder, please set it and retry again')
    }
    await findAndBackupRepos(ROOT_DIR, MAX_DEPTH);
})();