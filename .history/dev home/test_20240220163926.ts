// 导入fs模块，用于文件系统操作
import * as fs from 'node:fs';
import { JSONFilePreset } from 'lowdb/node'
import { Repo, Factory,repo } from './types';
import { Low } from 'lowdb';
// 定义一个常量，用于存储json数据库的文件名
const JSON_FILE = 'git_repos.json';

let factory: Factory = {
    ".git": {
        isType(dir: string) {
            return fs.existsSync(dir + '/.git');
        },
        GetRepoInfo(dir: string) {
            // 定义一个GitRepo对象，用于存储git库的信息
            let gitRepo: Repo = {
                remotes: new Set<string>(), // git库的所有远程地址
            };

            // 读取.git/config文件，获取所有远程地址
            let config = fs.readFileSync(dir + '/.git/config', 'utf-8');

            // 使用正则表达式，匹配所有的url字段
            let regex = /url = (.*)/g;

            // 定义一个变量，用于存储匹配结果
            let match;

            // 循环匹配，直到没有更多结果
            while ((match = regex.exec(config)) !== null) {
                // 获取匹配到的url，去除两端的空格，并添加到remotes数组中
                let url = match[1].trim();
                gitRepo.remotes.add(url);
            }
            return gitRepo;
        }
    }
}


// 定义一个常量，用于存储当前目录
const CURRENT_DIR = 'C:\\ScriptsApplications';

// 定义一个常量，用于存储最大深度
const MAX_DEPTH = 5;

const defaultData: Repos = {}
JSONFilePreset('db.json', defaultData)
    .then(db => {


        // 调用findGitRepos函数，遍历当前目录，找到git库
        //let gitRepos = findGitRepos(CURRENT_DIR, MAX_DEPTH);

        db.write()
    })
    // 打印成功信息
    .then(v => console.log('Done! Check the ' + JSON_FILE + ' file for the results.'))


