// 导入fs模块，用于文件系统操作
import * as fs from 'node:fs';

import { JSONFilePreset } from 'lowdb/node'

/**
 * 定义一个接口，用于描述git库的信息
 */
type GitRepo = {
    desc?: string; // git库的描述信息
    remotes?: string[]; // git库的所有远程地址
}


type GitRepos = {
    [dir: string]: GitRepo; // 以目录为键，以git库数组为值
}
// 定义一个常量，用于存储json数据库的文件名
const JSON_FILE = 'git_repos.json';

// 定义一个函数，用于遍历目录，找到git库，并返回一个GitRepo数组
function findGitRepos(dir: string, depth: number): GitRepo[] {
    // 如果深度为0，说明已经达到最大层级，直接返回空数组
    if (depth === 0) {
        return [];
    }

    // 定义一个空数组，用于存储找到的git库
    let gitRepos: GitRepo[] = [];

    // 读取目录下的所有文件和子目录
    let files = fs.readdirSync(dir);

    // 遍历所有文件和子目录
    for (let file of files) {
        // 拼接完整的路径
        let path = dir + '/' + file;

        // 判断是否是目录
        let isDir = fs.existsSync(path) && fs.statSync(path)?.isDirectory();

        // 如果是目录，判断是否是git库
        if (isDir) {
            // 判断是否存在.git目录
            let isGitRepo = fs.existsSync(path + '/.git');

            // 如果是git库，获取其信息，并添加到数组中
            if (isGitRepo) {
                // 定义一个GitRepo对象，用于存储git库的信息
                let gitRepo: GitRepo = {
                    remotes: [], // git库的所有远程地址
                };

                // 读取.git/config文件，获取所有远程地址
                let config = fs.readFileSync(path + '/.git/config', 'utf-8');

                // 使用正则表达式，匹配所有的url字段
                let regex = /url = (.*)/g;

                // 定义一个变量，用于存储匹配结果
                let match;

                // 循环匹配，直到没有更多结果
                while ((match = regex.exec(config)) !== null) {
                    // 获取匹配到的url，去除两端的空格，并添加到remotes数组中
                    let url = match[1].trim();
                    gitRepo.remotes.push(url);
                }

                // 将gitRepo对象添加到gitRepos数组中
                gitRepos.push(gitRepo);
            }

            // 如果不是git库，递归调用findGitRepos函数，遍历子目录，深度减一
            else {
                gitRepos = gitRepos.concat(findGitRepos(path, depth - 1));
            }
        }
    }

    // 返回gitRepos数组
    return gitRepos;
}

// 定义一个常量，用于存储当前目录
const CURRENT_DIR = 'C:\\ScriptsApplications';

// 定义一个常量，用于存储最大深度
const MAX_DEPTH = 5;

const defaultData: GitRepos = {}
JSONFilePreset('db.json', defaultData)
    .then(db => {


        // 调用findGitRepos函数，遍历当前目录，找到git库
        let gitRepos = findGitRepos(CURRENT_DIR, MAX_DEPTH);

        db.write()
    })
    // 打印成功信息
    .then(v => console.log('Done! Check the ' + JSON_FILE + ' file for the results.'))


