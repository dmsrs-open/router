// 导入fs模块，用于文件系统操作
import * as fs from 'node:fs';

import { JSONFilePreset } from 'lowdb/node'

/**
 * 定义一个接口，用于描述git库的信息
 */
interface GitRepo {
    desc?: string; // git库的描述信息
    remotes?: string[]; // git库的所有远程地址
}

/**
 * 定义一个接口，用于描述git库的集合
 */
interface GitRepos {
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


