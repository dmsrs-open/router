// gitBackup.ts
import fs from 'node:fs';
import path from 'path';
import { Factory, Context, MergeOptions } from 'backup.d';
import { JSONFilePreset } from 'lowdb/node';
import { extend, removeDuplicates } from './utils';

interface Repo {
    name: string;
    remotes: string[];
}

class GitRepoProcessor implements Factory {
    // ... (GitRepoProcessor 类的实现保持不变)
    []
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