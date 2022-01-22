import AbstractBranch from './AbstractBranch.js';
import Object from './Object.js';
export default class Series {
    readonly number: number;
    readonly title: string;
    readonly uri: string;
    readonly branch: AbstractBranch;
    constructor(number: number, title: string, uri: string, branch: AbstractBranch);
    objects(): Promise<Object[]>;
}
