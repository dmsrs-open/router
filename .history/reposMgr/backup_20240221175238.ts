// gitBackup.ts
import fs from 'node:fs';
import path from 'path';
import { Factory, Context, MergeOptions, Proccessor，Repos } from 'backup.d';
import { JSONFilePreset } from 'lowdb/node';
import { extend, removeDuplicates } from './utils';



class GitRepoProcessor implements Proccessor {
    name: '.git'
    shouldProccess(ctx: Context) {
        return fs.existsSync(path.join(ctx.curDir, '.git'));
    }
    backupRepo(ctx: Context) {
        // 定义一个GitRepo对象，用于存储git库的信息
        let repo: Repo = {
            name: 'unknown',
            remotes: [], // git库的所有远程地址
        };

        // 读取.git/config文件，获取所有远程地址
        let config = fs.readFileSync(path.join(ctx.curDir, '.git', 'config'), 'utf-8');

        // 使用正则表达式，匹配所有的url字段
        let regex = /url = (.*)/g;

        // 定义一个变量，用于存储匹配结果
        let match;

        // 循环匹配，直到没有更多结果
        while ((match = regex.exec(config)) !== null) {
            // 获取匹配到的url，去除两端的空格，并添加到remotes数组中
            let url = match[1].trim()
            repo.name = url?.split('/')?.pop();
            repo.remotes.push(url);
        }
        repo.remotes = removeDuplicates(repo.remotes);
        return repo;
    }

    restoreRepo(ctx, repo) {

        return false;
    }
}

export async function findAndBackupRepos(currentDir: string, maxDepth: number): Promise<void> {
    const defaultData: Repos = {}
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
    // ... (findRepos 函数的实现保持不变)
}

const CURRENT_DIR = ['C:\\ScriptsApplications', 'G:\\'].filter(val => fs.existsSync(val))[0];
const MAX_DEPTH = 5;

(async () => {
    await findAndBackupRepos(CURRENT_DIR, MAX_DEPTH);
})();