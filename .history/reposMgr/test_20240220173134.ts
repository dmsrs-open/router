// 导入fs模块，用于文件系统操作
import { JSONFilePreset } from 'lowdb/node'
import { Context, Repos } from './types';
import { factory } from './factory';

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

const CURRENT_DIR = 'C:\\ScriptsApplications';
const MAX_DEPTH = 5;

const defaultData: Repos = {}
JSONFilePreset('db.json', defaultData)
    .then(db => {
        let ctx: Context = {
            depth: 0,
            curDir: CURRENT_DIR,
            data: db,
            rootDir: CURRENT_DIR
        }


        return ctx;
    })
    // 打印成功信息
    .then(v => console.log('Done! Check the ' + JSON_FILE + ' file for the results.'))


