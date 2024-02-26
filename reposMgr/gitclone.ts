import { exec } from 'child_process';
import { Repo } from './types';

// 定义要克隆的仓库地址
const repositoryUrl = 'https://github.com/user/repo.git';
// 定义克隆的目标本地目录
const targetDirectory = './my-repo';

// 创建一个异步函数来执行git clone命令
export async function gitClone(repoUrl: string | Repo, targetDir: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (repoUrl instanceof String) {
            exec(`git clone ${repoUrl} ${targetDir}`, (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(`Failed to execute git clone: ${error.message}\n${stderr}`));
                } else {
                    console.log(`Git clone output:\n${stdout}`);
                    resolve();
                }
            });
        } else {
            let repo = repoUrl as Repo
            repo?.remotes.forEach(remote => {

                exec(`git clone ${repo.remotes[remote]} ${targetDir}`, (error, stdout, stderr) => {
                    if (error) {
                        reject(new Error(`Failed to execute git clone: ${error.message}\n${stderr}`));
                    } else {
                        console.log(`Git clone output:\n${stdout}`);
                        resolve();
                    }
                });
            })
        }

    })
}

// 调用函数执行git clone
gitClone(repositoryUrl, targetDirectory)
    .then(() => console.log('Clone completed successfully.'))
    .catch(err => console.error('Error during cloning:', err));

// 如果你想保存执行结果而不是仅仅打印出来，可以在回调函数中处理stdout和stderr