import Series from './Series.js';
import Object from './Object.js';
declare type ObjectTag = {
    uri: string;
    title: string;
};
declare type ObjectImage = {
    uri: string;
    alt: string;
    title: string;
};
export default abstract class AbstractBranch {
    readonly uri: string;
    protected _html: object;
    constructor(uri: string);
    html(page?: string): Promise<string>;
    series(): Promise<Series[]>;
    objects(series: Series): Promise<Object[]>;
    getObjectTags(object: Object): Promise<ObjectTag[]>;
    getObjectRating(object: Object): Promise<number | null>;
    getObjectImage(object: Object): Promise<ObjectImage | null>;
}
export type { ObjectTag, ObjectImage };
