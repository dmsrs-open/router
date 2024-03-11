import { Low } from "lowdb";

import { Repo, Repos } from "./types";

export async function upgradeConfig(db: Low<Repos>) {

    return await db.read()
        .then(() => {
            console.log('checking upgradable.');
            if (!Object.hasOwn(db.data, '__version')) {
                db.data['__version'] = '1.0.0';
                for (let key in db.data) {
                    delete db.data[key]['remotes'];
                }
            }
        }).then(() => {
            let version: any = db.data['__version']
            var type = typeof version
            if (type === 'object') {
                db.data['__version'] = version = '2.0.0'
                db.write()
            } else if (type === 'string') {

            }
            console.log('current db version:', version);
            return version
        }).then(version => {
            if (version == '1.0.0') {
                console.log('trying upgrade 2.0.0');
                db.data['__version'] = '2.0.0';
            }
            return version
        }).then(version => {
            if (version === '2.0.0') {

            }
            return version
        }).then(version => {
            for (let key in db.data) {
                if (ignorePathStarts.findIndex(v => key.startsWith(v)) > -1) {
                    delete db.data[key];
                } else {
                    let repo = db.data[key]
                    if (typeof repo === 'object')
                        Object.keys(repo).forEach(prop => {
                            if (keepedRepoKeys.findIndex(k => prop == k) == -1) {
                                delete repo[prop]
                            }
                        })
                    if (repo.remote) {
                        Object.values(repo.remote).forEach(v => {
                            let k = Object.keys(v).forEach(k => {
                                if (k != 'url') {
                                    delete v[k];
                                }
                            })
                        })
                    }
                    db.data[key] = repo
                }
            }

        })
        .then(() => db.write().then(() => db.read()))
        .then(() => db);


}

export const keepedRepoKeys = ['name', '__processorName', 'remote', 'submodule']; //, 'gitflow'
export const ignorePathStarts = ['test', '.devhome','$RECYCLE.BIN'];
