export default class Object {
    constructor(number, title, uri, branch) {
        this.number = number;
        this.title = title;
        this.uri = uri;
        this.branch = branch;
    }
    get tags() {
        return new Promise(async (resolve) => {
            if (this._tags === undefined)
                this._tags = await this.branch.getObjectTags(this);
            resolve(this._tags);
        });
    }
    get rating() {
        return new Promise(async (resolve) => {
            if (this._rating === undefined)
                this._rating = await this.branch.getObjectRating(this);
            resolve(this._rating);
        });
    }
    get image() {
        return new Promise(async (resolve) => {
            if (this._image === undefined)
                this._image = await this.branch.getObjectImage(this);
            resolve(this._image);
        });
    }
}
;
