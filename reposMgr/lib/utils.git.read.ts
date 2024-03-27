import fs, { PathLike } from "node:fs";
import * as ini from 'ini';
import { Repo } from './types';
import { keepedRepoKeys } from "./upgradeConfig";

export function readGitConfig(configPath: PathLike) {
    // 读取.git/config文件
    let configContent = '';
    let gitConfig: Repo = null;

    try {
        configContent = fs.readFileSync(configPath, 'utf-8');
        configContent = sectionNameEscape(configContent)
        // 解析ini内容为对象
        gitConfig = ini.parse(configContent) as any;

        gitConfig.name = (
            gitConfig.remote?.origin?.url ||
            gitConfig.remote?.upstream?.url ||
            (gitConfig.remote ? Object.values(gitConfig.remote).findLast(v => v.url)?.url : '/unknown')
        )?.split('/')?.pop();
        if (gitConfig.name == 'unknown') {
            console.error('git config would be wrong!');
            console.error(' ', 'file path:', configPath);
            console.error(' ', 'config Content', configContent);
            console.error(' ', 'git config:', gitConfig);
        }

        Object.keys(gitConfig).forEach(prop => {
            if (keepedRepoKeys.findIndex(k => prop == k) == -1)
                delete gitConfig[prop]
        })
        if (gitConfig.remote) {
            Object.values(gitConfig.remote).forEach(v => {
                let k = Object.keys(v).forEach(k => {
                    if (k != 'url') {
                        delete v[k];
                    }
                })
            })
        }

        return gitConfig;
    } catch (err) {
        console.error('error on reading:', configPath, 'content:', configContent, 'error:', err.message, ',', err.stack);
        return {
            name: 'unknown',
            desc: `error:${err.message}.${err.stack}. file:${configPath}. content:${configContent}. gitConfig: ${JSON.stringify(gitConfig)}`
        };
    }

}

function sectionNameEscape(str: string) {
    // ini.parse 会把section中的`.`作为对象层级的分割，所以，把原有.替换为$dot$，然后将空格替换为`.`，则自动解析
    return str.replaceAll(/\[.*?\]/g, function (match) {
        return (match.replaceAll(`"`, ``).replaceAll('.', '$dot$').replace(/[ \t]+/g, '.'));
    });
}




// const gitConfigPath = path.join(`C:/AppData/code-front/vite-templates`, `.git`, 'config');
// const test = `[core]
// 	repositoryformatversion = 0
// 	filemode = false
// 	bare = false
// 	logallrefupdates = true
// 	ignorecase = true
// [remote "origin"]
// 	url = https://github.com/niubilitynetcore/EmitMapper.git
// 	fetch = +refs/heads/*:refs/remotes/origin/*
// 	pushurl = https://github.com/niubilitynetcore/EmitMapper.git
// [branch "master"]
// 	remote = origin
// 	merge = refs/heads/master
// [remote "origin2"]
// 	url = https://gitee.com/code-shelter/EmitMapper.git
// 	fetch = +refs/heads/*:refs/remotes/origin2/*
// [branch "net8.0"]
// 	remote = origin
// 	merge = refs/heads/net8.0`
// console.log(fixSectionName(test))