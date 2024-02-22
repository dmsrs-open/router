
import { Low } from 'lowdb';
export type Repo = {
    desc?: string; // optional description of the repository
    remotes?: Set<string>; // optional list of remote repositories
};

export type Repos = {
    [dir: string]: Repo;
};

export type Factory = {
    [typeName: string]: {
        isType(ctx: Context): boolean;
        GetRepoInfo(ctx: Context): Repo;
    }
}
export type Context = {
    curDir: string;
    depth: number;
    data: Low<Repos>;
    root
}