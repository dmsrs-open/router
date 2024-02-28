import fs, { PathLike } from "node:fs";
import path from "path";
import * as ini from 'ini'; // 需要先安装ini库，命令：npm install ini
import { Context, Proccessor, Repo } from './types';
import { removeDuplicates, extend } from "./utils";
import { gitClone } from './gitclone';
import { extractQuotedValue } from "./utils";

export class GitRepoProcessor implements Proccessor {
    name: '.git';
    async shouldRestore(ctx: Context, repo: Repo) {
        return repo?.name.endsWith('.git');
    }

    async shouldBackup(ctx: Context) {
        return fs.existsSync(path.join(ctx.curDir, '.git'));
    }
    async backupRepo(ctx: Context) {
        // 定义一个GitRepo对象，用于存储git库的信息
        let repo: Repo = {
            name: 'unknown'
        };

        let configPath = path.join(ctx.curDir, '.git', 'config')

        repo = readGitConfig(configPath)
        return repo;
    }

    async restoreRepo(ctx, repo) {
        await gitClone(repo, ctx.curDir)
        return false;
    }
}
//C:\ScriptsApplications\code-front\vite-templates\.git

const gitConfigPath = path.join(`C:/ScriptsApplications/code-front/vite-templates`, `.git`, 'config');
function readGitConfig(configPath: PathLike) {

    try {
        // 读取.git/config文件
        const configContent = fs.readFileSync(configPath, 'utf-8');
        // 解析ini内容为对象
        const gitConfig: Repo = ini.parse(configContent);
        let prefixes = ['remote', 'branch', 'submodule']
        for (let key in gitConfig) {
            prefixes.forEach((prefix, idx) => {
                if (key.startsWith(prefix)) {
                    let subKey = extractQuotedValue(key);
                    if (!gitConfig[prefix])
                        gitConfig[prefix] = {}
                    if (!gitConfig[prefix][subKey]) {
                        gitConfig[prefix][subKey] = {}
                    }
                    gitConfig[prefix][subKey] = extend(gitConfig[prefix][subKey], gitConfig[key])

                    delete gitConfig[key];
                }
            })
        }
        gitConfig.name = (
            gitConfig.remote?.origin?.url ??
            gitConfig.remote?.upstream?.url ??
            Object.values(gitConfig.remote).findLast(v => v.url)?.url ??
            'unknown'
        )?.split('/')?.pop();;
        if (gitConfig.name == 'unkown') {
            console.log(gitConfig)
        }

        return gitConfig;
    } catch (error) {
        console.error(`Error reading or parsing .git/config file: ${error.message}`);
        return {
            name: 'unknown',
            desc: `error:${JSON.stringify(error)}`
            //remotes: [], // git库的所有远程地址
        }
    }
}
// readGitConfig(gitConfigPath)

