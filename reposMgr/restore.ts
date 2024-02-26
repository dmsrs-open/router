// gitBackup.ts
import fs from 'node:fs';
import path from 'path';
import { Context, Repos } from './types'
import { JSONFilePreset } from 'lowdb/node';
import { extend } from './utils';
import { factory } from './factory';

export async function findAndBackupRepos(rootDir: string, maxDepth: number): Promise<void> {
    let defaultData: Repos = {};
    await JSONFilePreset('db.json', defaultData)
        .then(db => {
            const ctx: Context = {
                curDir: rootDir,
                db,
                rootDir: rootDir
            };

            return ctx;
        })
        .then(ctx => {

            return ctx;
        })
        .then(ctx => console.log('Done! Check the ' + ctx.rootDir + ' file for the results.'))
}

async function restoreRepo(rootDir: string, depth: number, ctx: Context) {

    for (let key in ctx.db.data) {
        let repo = ctx.db.data[key];
        ctx.curDir = path.join(ctx.rootDir, key)
        await Promise.all(factory.map(async p => {

            // 判断是否存在.git目录
            let shouldRestore = p.shouldRestore(ctx, repo)
            // 如果是git库，获取其信息，并添加到数组中
            if (shouldRestore) {
                // 定义一个GitRepo对象，用于存储git库的信息
                let result = await p.restoreRepo(ctx, repo)
                if (!result) {
                    console.log('Error: ' + ctx.curDir + ' is not a git repository!');
                }
            }
            // 如果不是git库，递归调用findGitRepos函数，遍历子目录，深度减一
            else {

            }

        }))
    }
}

const CURRENT_DIR = ['C:\\ScriptsApplications', 'G:\\'].filter(val => fs.existsSync(val))[0];
const MAX_DEPTH = 5;

(async () => {
    await findAndBackupRepos(CURRENT_DIR, MAX_DEPTH);
})();