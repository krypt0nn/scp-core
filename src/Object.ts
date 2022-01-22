import AbstractBranch from './AbstractBranch.js';

import type { ObjectTag, ObjectImage } from './AbstractBranch.js';

export default class Object
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

    protected _tags?: ObjectTag[];
    protected _rating?: number|null;
    protected _image?: ObjectImage|null;

    public get tags(): Promise<ObjectTag[]>
    {
        return new Promise(async (resolve) => {
            if (this._tags === undefined)
                this._tags = await this.branch.getObjectTags(this);

            resolve(this._tags);
        });
    }

    public get rating(): Promise<number|null>
    {
        return new Promise(async (resolve) => {
            if (this._rating === undefined)
                this._rating = await this.branch.getObjectRating(this);

            resolve(this._rating);
        });
    }

    public get image(): Promise<ObjectImage|null>
    {
        return new Promise(async (resolve) => {
            if (this._image === undefined)
                this._image = await this.branch.getObjectImage(this);

            resolve(this._image);
        });
    }
};
