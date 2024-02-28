import { exec } from 'child_process';
import { Repo } from './types';

// 创建一个异步函数来执行git clone命令
export async function gitClone(repo: Repo, targetDir: string): Promise<void> {
    return new Promise((resolve, reject) => {
        Object.entries(repo.remote).map(([name, remote]) => {

            exec(`git clone ${remote.url} ${targetDir}`, (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(`Failed to execute git clone: ${error.message}\n${stderr}`));
                } else {
                    console.log(`Git clone output:\n${stdout}`);
                    resolve();
                }
            });
        });
    })
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

// 调用函数执行git clone
function test_clone() {
    gitClone(repositoryUrl, targetDirectory)
        .then(() => console.log('Clone completed successfully.'))
        .catch(err => console.error('Error during cloning:', err));
}

// test_clone()