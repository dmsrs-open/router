import { exec, execSync } from 'child_process';
import { Repo } from './types';

// 创建一个异步函数来执行git clone命令
export function gitClone(repo: Repo, targetDir: string) {

    Object.entries(repo.remote)
        .map(([name, remoteConfig]) => {
            return cloneOrAddRemote(targetDir, name, remoteConfig.url)
        })
}

function executeCommand(command: string) {
    return execSync(command, { encoding: 'utf-8' }).trim();
}

function repositoryExistsAtPath(repoPath: string): boolean {
    try {
        executeCommand(`cd ${repoPath} && git rev-parse --git-dir`);
        return true;
    } catch (error) {
        return false;
    }
}

function addRemoteIfNotExists(repoPath: string, remoteName: string, remoteUrl: string) {
    const existingRemotes = executeCommand(`cd ${repoPath} && git remote -v`).split('\n');

    if (!existingRemotes.some(remote => remote.includes(`${remoteName} ${remoteUrl}`))) {
        return executeCommand(`cd ${repoPath} && git remote add ${remoteName} ${remoteUrl}`);

    } else {
        console.log(`Remote ${remoteName} already exists with URL ${remoteUrl}.`);
    }
}

function cloneOrAddRemote(repoPath: string, remoteName: string, remoteUrl: string) {
    if (!repositoryExistsAtPath(repoPath)) {
        console.log('Repository does not exist locally. Cloning...');
        return executeCommand(`git clone ${remoteUrl} ${repoPath}`);

    } else {
        console.log(`Repository exists locally. adding remote ${remoteName} = ${remoteUrl}`);
        return addRemoteIfNotExists(repoPath, remoteName, remoteUrl);
    }
}

const targetDirectory = './../../my-repo';
const repositoryUrl = {
    "name": "vue3_vite_ts.git",
    "core": {
        "repositoryformatversion": "0",
        "filemode": false,
        "bare": false,
        "logallrefupdates": true,
        "symlinks": false,
        "ignorecase": true
    },
    "remote": {
        "origin": {
            "url": "https://gitee.com/cnjimbo/vite-templates.git",
            "fetch": "+refs/heads/*:refs/remotes/origin/*"
        }
    },
    "branch": {
        "master": {
            "remote": "origin",
            "merge": "refs/heads/master"
        }
    },
    "submodule": {
        "js_geeker-admin": {
            "active": true,
            "url": "https://gitee.com/HalseySpicy/Geeker-Admin.git"
        },
        "vue-admin-template": {
            "url": "https://gitee.com/panjiachen/vue-admin-template.git",
            "active": true
        },
        "js_react-admin-template": {
            "active": true,
            "url": "https://gitee.com/asdadsaf/react-admin-template.git"
        },
        "jpure-admin-thin": {
            "active": true,
            "url": "https://gitee.com/yiming_chang/pure-admin-thin.git"
        },
        "vite-plugin-cdn-import-async": {
            "active": true,
            "url": "https://github.com/VaJoy/vite-plugin-cdn-import-async.git"
        },
        "vite_Vue3-TDesign-admin": {
            "active": true,
            "url": "https://github.com/WaliAblikim/Vue3-TDesign-admin.git"
        },
        "vite_admin-boilerplate": {
            "active": true,
            "url": "https://github.com/hiliyongke/vue3-admin-boilerplate.git"
        },
        "vue-pure-admin": {
            "active": true,
            "url": "https://gitee.com/yiming_chang/vue-pure-admin.git"
        },
        "vue3-vite-ts": {
            "active": true,
            "url": "https://gitee.com/spiketyke/vue3_vite_ts.git"
        }
    }
};
const REMOTE_REPO_URL = "https://gitee.com/spiketyke/vue3_vite_ts.git";

// 调用函数执行git clone
function test_clone() {
    gitClone(repositoryUrl, targetDirectory)
        // .then(() => console.log('Clone completed successfully.'))
        // .catch(err => console.error('Error during cloning:', err));
}

// test_clone()