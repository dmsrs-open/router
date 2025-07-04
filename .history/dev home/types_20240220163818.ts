
    export type Repo = {
        desc?: string; // optional description of the repository
        remotes?: Set<string>; // optional list of remote repositories
    };

    type Repos = {
        [dir: string]: Repo;
    };

    type Factory = {
        [typeName: string]: {
            isType(dir: string): boolean;
            GetRepoInfo(dir: string): Repo;
        }
    }
