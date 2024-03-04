import fs from "node:fs";
import path from "path";
import { Context, Proccessor, Repo } from './types';
import { gitClone } from './utils.git.write';
import { readGitConfig } from "./utils.git.read";

export class GitRepoProcessor implements Proccessor {
    readonly name: string = '.git';
    async shouldRestore(ctx: Context, repo: Repo) {
        return repo?.__processorName === this.name;
    }

    async shouldBackup(ctx: Context) {
        return fs.existsSync(path.join(ctx.curDir, '.git'));
    }
    async backupRepo(ctx: Context) {
        // 定义一个GitRepo对象，用于存储git库的信息
        let repo: Repo = {
            name: 'unknown'
        };
        console.log(`Backuping... git配置文件：${ctx.curDir}`)
        let configPath = path.join(ctx.curDir, '.git', 'config')

        repo = readGitConfig(configPath)
        return repo;
    }

    async restoreRepo(ctx, repo) {
        gitClone(repo, ctx.curDir)
        return false;
    }
}
