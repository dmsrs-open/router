import fs, { PathLike } from "node:fs";
import path from "path";
import * as ini from 'ini'; // 需要先安装ini库，命令：npm install ini
import { Context, Proccessor, Repo } from './types';
import { removeDuplicates, extend } from "./utils";
import { gitClone } from './gitclone';
import { extractQuotedValue } from "./utils";

export class GitRepoProcessor implements Proccessor {
    readonly name: string = '.git';
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
    // 读取.git/config文件
    let configContent = ''
    let gitConfig: Repo = null
    const prefixes = ['remote', 'branch', 'submodule']
    try {
        configContent = fs.readFileSync(configPath, 'utf-8');
        // 解析ini内容为对象
        gitConfig = ini.parse(configContent);
        Object.keys(gitConfig).map((key) => {
            let prefix = prefixes.find(prefix => key.startsWith(prefix))
            if (prefix) {
                let subKey = extractQuotedValue(key);
                if (subKey) {
                    if (!gitConfig[prefix]) {
                        gitConfig[prefix] = {}
                    }
                    gitConfig[prefix][subKey] = extend({}, gitConfig[prefix][subKey], gitConfig[key])
                    delete gitConfig[key];
                }
            }
        })
        gitConfig.name = (
            gitConfig.remote?.origin?.url ||
            gitConfig.remote?.upstream?.url ||
            (gitConfig.remote ? Object.values(gitConfig.remote).findLast(v => v.url)?.url : '/unknown')
        )?.split('/')?.pop();
        if (gitConfig.name == 'unknown') {
            console.log(gitConfig)
        }

        return gitConfig;
    } catch (err) {
        console.error('error on reading:', configPath, 'content:', configContent, 'error:', err.message, ',', err.stack)
        return {
            name: 'unknown',
            desc: `error:${err.message}.${err.stack}. file:${configPath}. content:${configContent}. gitConfig: ${JSON.stringify(gitConfig)}`
        }
    }

}
// readGitConfig(gitConfigPath)

