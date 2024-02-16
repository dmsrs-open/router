"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
// 定义输出文件路径
const outputFile = `GithubUrls_${new Date().toISOString().replace(/[:\-T]/g, '').slice(0, 14)}.json`;
// 正则表达式匹配远程仓库信息
const regex = /(\w+)([\s]+|[(\t)]+)([@\w:\/.-]+)[\s]+\((\w+)\)/;
const projectRemotes = {};
function testGitUrl(remoteUrl) {
    try {
        // 尝试列出远程仓库的引用，如果成功返回 true，否则返回 false
        (0, child_process_1.execSync)(`git ls-remote ${remoteUrl}`, { stdio: ['ignore', 'ignore', 'ignore'] });
        return true;
    }
    catch (error) {
        return false;
    }
}
// 遍历目录并查找 .git 目录，同时处理远程仓库信息
const rootPath = 'G:\\';
for (let depth = 0; depth <= 5; depth++) {
    const directories = fs.readdirSync(path.join(rootPath), { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name === '.git')
        .map(dirent => path.dirname(dirent.name));
    for (const gitDir of directories) {
        const projectRoot = path.dirname(gitDir);
        const remotesOutput = (0, child_process_1.execSync)('git remote -v', { cwd: projectRoot, encoding: 'utf8' });
        const remotes = remotesOutput.split('\n');
        if (remotes.length > 0) {
            for (const remote of remotes) {
                const match = regex.exec(remote);
                if (match && match.length >= 4) {
                    const remoteName = match[1].trim();
                    const action = match[4].trim();
                    const url = match[3].trim();
                    if (testGitUrl(url)) {
                        if (!projectRemotes[projectRoot]) {
                            projectRemotes[projectRoot] = {};
                        }
                        if (!projectRemotes[projectRoot][remoteName]) {
                            projectRemotes[projectRoot][remoteName] = {};
                        }
                        projectRemotes[projectRoot][remoteName][action] = url;
                    }
                    else {
                        console.log(`Remote Url '${url}' can't access, it can't be restored. ${projectRoot}`);
                    }
                }
            }
        }
        else {
            console.log(`Not a valid git repo. ${projectRoot}`);
        }
    }
}
// 将处理后的结果转为 JSON 并写入文件
fs.writeFileSync(outputFile, JSON.stringify(projectRemotes, null, 2), { encoding: 'utf8' });
console.log(`Git remote URLs have been written to ${outputFile}.`);
//# sourceMappingURL=test.js.map