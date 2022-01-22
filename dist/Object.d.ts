import AbstractBranch from './AbstractBranch.js';
import type { ObjectTag, ObjectImage } from './AbstractBranch.js';
export default class Object {
    readonly number: number;
    readonly title: string;
    readonly uri: string;
    readonly branch: AbstractBranch;
    constructor(number: number, title: string, uri: string, branch: AbstractBranch);
    protected _tags?: ObjectTag[];
    protected _rating?: number | null;
    protected _image?: ObjectImage | null;
    get tags(): Promise<ObjectTag[]>;
    get rating(): Promise<number | null>;
    get image(): Promise<ObjectImage | null>;
}
