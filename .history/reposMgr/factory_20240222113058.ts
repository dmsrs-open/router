import { Proccessor } from './backup.d';
import { GitRepoProcessor } from './restore';

export let factory: Proccessor[] = [new GitRepoProcessor()];
