// gitBackup.ts
import fs from 'node:fs';
import path from 'path';
import { Factory, Context, MergeOptions, Repos } from './types'
import { JSONFilePreset } from 'lowdb/node';
import { extend } from './utils';
import { factory } from './factory';
import { upgradeConfig } from './utils';

async function findRepos(dir: string, depth: number, ctx: Context) {
    if (depth === 0) {
        return;
    }
    let files = fs.readdirSync(dir);

    // 遍历所有文件和子目录
    for (let file of files) {
        // 拼接完整的路径
        let curDirPath = path.join(dir, file);
        let key = curDirPath.replace(ctx.rootDir, '')
        ctx.curDir = curDirPath;
        for (let p of factory) {
            // 判断是否是目录
            let isDir = fs.existsSync(curDirPath) && fs.statSync(curDirPath)?.isDirectory();
            // 如果是目录，判断是否是git库
            if (isDir) {
                // 判断是否存在.git目录
                let isGitRepo = await p.shouldBackup(ctx)
                // 如果是git库，获取其信息，并添加到数组中
                if (isGitRepo) {
                    // 定义一个GitRepo对象，用于存储git库的信息
                    let repo = await p.backupRepo(ctx)
                    console.log(p)
                    ctx.db.data[key] = extend({ "__processor": p.name }, ctx.db.data[key], repo);

                    //仅能有一个处理器处理当前库
                    break;
                }
                // 如果不是git库，递归调用findGitRepos函数，遍历子目录，深度减一
                else {
                    await findRepos(curDirPath, depth - 1, ctx)
                }
            }
        }
    }
}

export async function findAndBackupRepos(rootDir: string, maxDepth: number): Promise<void> {
    let defaultData: Repos = {};
    await JSONFilePreset('db.json', defaultData)
        .then(async db => {
            await upgradeConfig(db);
            const ctx: Context = {
                curDir: rootDir,
                db,
                rootDir: rootDir
            };
            await findRepos(rootDir, maxDepth, ctx);
            return ctx;
        })
        .then(async ctx => {
            await ctx.db.write()
            return ctx;
        })
        .then(ctx => console.log('\r\n\r\n', 'Done! Check the ' + ctx.rootDir + ' file for the results.'))
        .catch(err => console.error('\r\n\r\n', 'Error：', err))
}

const ROOT_DIR = ['C:\\ScriptsApplications', 'G:\\'].filter(val => fs.existsSync(val))[0];
const MAX_DEPTH = 5;

(async () => {
    await findAndBackupRepos(ROOT_DIR, MAX_DEPTH);
})();