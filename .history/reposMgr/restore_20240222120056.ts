// gitBackup.ts
import fs from 'node:fs';
import path from 'path';
import { Factory, Context, MergeOptions, Repos } from  './backup.d'
import { JSONFilePreset } from 'lowdb/node';
import { extend } from './utils';
import { factory } from './factory';

export async function findAndBackupRepos(currentDir: string, maxDepth: number): Promise<void> {
 
    const db = await JSONFilePreset('db.json', defaultData);

    const ctx: Context = {
        curDir: currentDir,
        db,
        rootDir: currentDir
    };

    findRepos(currentDir, maxDepth, ctx);

    await new Promise(resolve => setTimeout(resolve, 0)); // 确保数据写入完成
    db.write();

    console.log('Done! Check the ' + ctx.rootDir + ' file for the results.');
}

function findRepos(dir: string, depth: number, ctx: Context) {
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

        factory.forEach((p) => {
            // 判断是否是目录
            let isDir = fs.existsSync(curDirPath) && fs.statSync(curDirPath)?.isDirectory();
            // 如果是目录，判断是否是git库
            if (isDir) {
                // 判断是否存在.git目录
                let isGitRepo = p.shouldProccess(ctx)
                // 如果是git库，获取其信息，并添加到数组中
                if (isGitRepo) {
                    // 定义一个GitRepo对象，用于存储git库的信息
                    let repo = p.backupRepo(ctx)
                    ctx.db.data[key] = extend(ctx.db.data[key], repo);
                }
                // 如果不是git库，递归调用findGitRepos函数，遍历子目录，深度减一
                else {
                    findRepos(curDirPath, depth - 1, ctx)
                }
            }
        },)
    }
}

const CURRENT_DIR = ['C:\\ScriptsApplications', 'G:\\'].filter(val => fs.existsSync(val))[0];
const MAX_DEPTH = 5;

(async () => {
    await findAndBackupRepos(CURRENT_DIR, MAX_DEPTH);
})();