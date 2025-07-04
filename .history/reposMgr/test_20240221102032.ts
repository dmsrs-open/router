// 导入fs模块，用于文件系统操作
import { JSONFilePreset } from 'lowdb/node'
import { Repo, Repos, Factory, Context } from './types';
import * as fs from 'node:fs';
import path from 'path'
interface MergeOptions {
    // 如果为 true，则进行深度合并，否则仅浅层合并
    deep?: boolean;
}
function removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)];
}
function extend<T, U>(target: T, source: U, options?: MergeOptions): T & U {
    const isDeep = options?.deep ?? false;
    target = target || {} as T;
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const srcVal = source[key];
            const tarVal = (target as any)[key];

            if (isDeep && typeof srcVal === 'object' && srcVal !== null && !Array.isArray(srcVal) && typeof tarVal === 'object' && tarVal !== null) {
                extend(tarVal as any, srcVal as any, { deep: true });
            } else {
                (target as any)[key] = srcVal;
            }
        }
    }

    return target as T & U;
}



let factory: Factory = new Set([
    {
        name: '.git',
        shouldProccess(ctx: Context) {
            return fs.existsSync(ctx.curDir + '/.git');
        },
        GetRepoInfo(ctx: Context) {
            // 定义一个GitRepo对象，用于存储git库的信息
            let gitRepo: Repo = {
                remotes: [], // git库的所有远程地址
            };

            // 读取.git/config文件，获取所有远程地址
            let config = fs.readFileSync(ctx.curDir + '/.git/config', 'utf-8');

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
            gitRepo.remotes = removeDuplicates(gitRepo.remotes);
            return gitRepo;
        }
    }
])
function findRepos(dir: string, depth: number, ctx: Context) {
    if (depth === 0) {
        return [];
    }
    let files = fs.readdirSync(dir);

    // 遍历所有文件和子目录
    for (let file of files) {
        // 拼接完整的路径
        let dirPath = path.join(dir, file);
        let key = path.replace(ctx.rootDir, '')
        ctx.curDir = path;
        ctx.depth = depth;

        factory.forEach((p) => {
            // 判断是否是目录
            let isDir = fs.existsSync(path) && fs.statSync(path)?.isDirectory();

            // 如果是目录，判断是否是git库
            if (isDir) {
                // 判断是否存在.git目录
                let isGitRepo = p.shouldProccess(ctx)

                // 如果是git库，获取其信息，并添加到数组中
                if (isGitRepo) {
                    // 定义一个GitRepo对象，用于存储git库的信息
                    let gitRepo = p.GetRepoInfo(ctx)
                    ctx.db.data[key] = extend(ctx.db.data[path], gitRepo);
                }

                // 如果不是git库，递归调用findGitRepos函数，遍历子目录，深度减一
                else {
                    findRepos(path, depth - 1, ctx)
                }
            }
        },)

    }

}

const CURRENT_DIR = ['C:\\ScriptsApplications', 'G:\\'].filter(val => fs.existsSync(val))[0];
const MAX_DEPTH = 5;

const defaultData: Repos = {}
JSONFilePreset('db.json', defaultData)
    .then(db => {
        let ctx: Context = {
            depth: 0,
            curDir: CURRENT_DIR,
            db: db,
            rootDir: CURRENT_DIR
        }

        findRepos(CURRENT_DIR, MAX_DEPTH, ctx)

        return ctx;
    })
    .then(ctx => {
        ctx.db.write()
        return ctx;
    })
    // 打印成功信息
    .then(ctx => console.log('Done! Check the ' + ctx.curDir + ' file for the results.'))


