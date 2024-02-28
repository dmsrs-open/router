// gitBackup.ts
import fs from 'node:fs';
import path from 'path';
import { Context, Repos } from './types'
import { JSONFilePreset } from 'lowdb/node';
import { extend } from './utils';
import { factory } from './factory';
import { upgradeConfig } from './utils';

async function restoreRepo(ctx: Context) {

    Object.entries(ctx.db.data).map(async ([relativePath, repo]) => {
        console.log("====>", relativePath, repo)

        if (relativePath == '__version') return;
        //console.log("====>", relativePath, repo)
        await Promise.all(factory.map(async p => {
            let newnctx = extend(ctx, { rootDir: ctx.rootDir, curDir: path.join(ctx.rootDir, relativePath) });
            let shouldRestore = p.shouldRestore(newnctx, repo)
            // 如果是git库，获取其信息，并添加到数组中
            if (shouldRestore) {
                // 定义一个GitRepo对象，用于存储git库的信息
                let result = await p.restoreRepo(newnctx, repo)
                if (!result) {
                    console.log('Error: ' + newnctx.curDir + ' is not a git repository!');
                }
            }
            // 如果不是git库，递归调用findGitRepos函数，遍历子目录，深度减一
            else {

            }

        }))
    })


}
export async function findAndBackupRepos(rootDir: string, maxDepth: number): Promise<void> {
    let defaultData: Repos = {};
    await JSONFilePreset('db.json', defaultData)
        .then(async db => {
            const ctx: Context = {
                curDir: rootDir,
                db,
                rootDir: rootDir
            };
            await upgradeConfig(db)
            return ctx;
        })
        .then(async ctx => {
            await restoreRepo(ctx)
            return ctx;
        })
        .then(ctx => console.log('\r\n\r\n', 'Done! Check the ' + ctx.rootDir + ' file for the results.'))
        .catch(err => console.error('\r\n\r\n', 'Error：', err))
}

const CURRENT_DIR = ['C:\\ScriptsApplications\\test', 'G:\\test'].filter(val => fs.existsSync(val))[0];
const MAX_DEPTH = 5;

(async () => {
    await findAndBackupRepos(CURRENT_DIR, MAX_DEPTH);
})();