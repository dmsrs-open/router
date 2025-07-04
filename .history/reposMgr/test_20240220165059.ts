// 导入fs模块，用于文件系统操作
import { JSONFilePreset } from 'lowdb/node'
import { Repos } from './types';
import { factory } from './factory';
// 定义一个常量，用于存储json数据库的文件名
const JSON_FILE = 'git_repos.json';

function findRepos(ctx: Context) {
    if (factory['.git'].isType(dir)) {
        // 如果当前目录是git库，则获取git库的信息，并添加到结果数组中
        let gitRepo = factory['.git'].GetRepoInfo(dir);
        //console.log(gitRepo);
        //db.push(gitRepo).write();
    } else {
        // 如果当前目录不是git库，则遍历子目录
        if (depth > MAX_DEPTH) {
            return;
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


