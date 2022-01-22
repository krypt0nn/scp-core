import AbstractBranch from './AbstractBranch.js';

import Object from './Object.js';

export default class Series
{
    public readonly number: number;
    public readonly title: string;
    public readonly uri: string;
    public readonly branch: AbstractBranch;

    public constructor(number: number, title: string, uri: string, branch: AbstractBranch)
    {
        this.number = number;
        this.title = title;
        this.uri = uri;
        this.branch = branch;
    }

    public objects(): Promise<Object[]>
    {
        return this.branch.objects(this);
    }
};
