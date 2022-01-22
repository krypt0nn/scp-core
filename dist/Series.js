export default class Series {
    constructor(number, title, uri, branch) {
        this.number = number;
        this.title = title;
        this.uri = uri;
        this.branch = branch;
    }
    objects() {
        return this.branch.objects(this);
    }
}
;
