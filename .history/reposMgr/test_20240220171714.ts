// 导入fs模块，用于文件系统操作
import { JSONFilePreset } from 'lowdb/node'
import { Context, Repos } from './types';
import { factory } from './factory';
// 定义一个常量，用于存储json数据库的文件名
const JSON_FILE = 'git_repos.json';

function findRepos(ctx: Context) {

    if (factory['.git'].isType(ctx)) {
        // 如果当前目录是git库，则获取git库的信息，并添加到结果数组中
        let gitRepo = factory['.git'].GetRepoInfo(ctx);
        //console.log(gitRepo);
        //db.push(gitRepo).write();
    } else {
        // 如果当前目录不是git库，则遍历子目录
        if (ctx.depth > MAX_DEPTH) {
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
        let ctx: Context = {
            depth: 0,
            curDir: CURRENT_DIR,
            children: []
        }；


        return ctx;
    })
    // 打印成功信息
    .then(v => console.log('Done! Check the ' + JSON_FILE + ' file for the results.'))


