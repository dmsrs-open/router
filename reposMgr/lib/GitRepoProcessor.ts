import fs from "node:fs";
import path from "path";
import { Context, Proccessor, Repo } from './types';
import { gitClone } from './utils.git.write';
import { readGitConfig } from "./utils.git.read";
import { extend } from "./utils";

export class GitRepoProcessor implements Proccessor {
    readonly name: string = '.git';
    async shouldRestore(ctx: Context, repo: Repo) {
        return repo?.__processorName === this.name;
    }

    async shouldBackup(ctx: Context) {
        return fs.existsSync(path.join(ctx.curDir, '.git'));
    }
    async backupRepo(ctx: Context) {

        console.log(`Backuping... git配置文件：${ctx.curDir}`)
        let configPath = path.join(ctx.curDir, '.git', 'config')

        let repo = readGitConfig(configPath);
        repo['__processorName'] = this.name
        return repo;
    }

    async restoreRepo(ctx, repo) {
        gitClone(repo, ctx.curDir)
        return false;
    }
}
