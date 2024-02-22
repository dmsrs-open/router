
import { Low } from 'lowdb';

export type Repo = {
    name: string;
    desc?: string; // optional description of the repository
    remotes?: string[]; // optional list of remote repositories
};
export type Repos = {
    [dir: string]: Repo;
};
export type Proccessor = {
    name: string;
    shouldProccess(ctx: Context): boolean;
    backupRepo(ctx: Context): Repo;
}
export type Factory = Set<Proccessor>;
export type Context = {
    curDir: string;
    db: Low<Repos>;
    rootDir: string;
}
export interface MergeOptions {
    // 如果为 true，则进行深度合并，否则仅浅层合并
    deep?: boolean;
}