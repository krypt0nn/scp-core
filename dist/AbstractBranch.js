import https from 'https';
import Series from './Series.js';
import Object from './Object.js';
export default class AbstractBranch {
    constructor(uri) {
        this._html = {};
        this.uri = uri;
    }
    html(page = '') {
        return new Promise((resolve) => {
            if (this._html[page] === undefined) {
                https.get(`${this.uri}/${page}`, (res) => {
                    res.on('data', (data) => this._html[page] += data ?? '');
                    res.on('end', () => resolve(this._html[page]));
                });
            }
            else
                resolve(this._html[page]);
        });
    }
    series() {
        return new Promise(async (resolve) => {
            let html = await this.html();
            let series = [], i = 1, match;
            while (match = /<a href="\/(scp-series|scp-series-[\d]+)">([\w\d\s]+)<\/a>/mgi.exec(html)) {
                series.push(new Series(i++, match[2], match[1], this));
                html = html.replace(match[0], '');
            }
            resolve(series);
        });
    }
    objects(series) {
        return new Promise(async (resolve) => {
            let html = await this.html(series.uri);
            let objects = [], i = 1, match;
            while (match = /<li><a href="\/(scp-[\d]+)">SCP-[\d]+<\/a> - (.*)<\/li>[\s]{1}/mgi.exec(html)) {
                objects.push(new Object(i++, match[2], match[1], this));
                html = html.replace(match[0], '');
            }
            resolve(objects);
        });
    }
    getObjectTags(object) {
        return new Promise((resolve) => {
            this.html(object.uri).then((html) => {
                let tags = [], i = 1, match;
                while (match = /<a href="\/(system:page-tags\/tag\/[\w\d\-_]+#pages)">([\w\d\-_]+)<\/a>/mgi.exec(html)) {
                    tags.push({
                        uri: match[1],
                        title: match[2]
                    });
                    html = html.replace(match[0], '');
                }
                resolve(tags);
            });
        });
    }
    getObjectRating(object) {
        return new Promise((resolve) => {
            this.html(object.uri).then((html) => {
                const match = /<span class="rate-points">rating:&nbsp;<span class="number [\w\d]+">([\d\+\-]+)<\/span><\/span>/mgi.exec(html);
                resolve(match ? parseInt(match[1]) : null);
            });
        });
    }
    getObjectImage(object) {
        return new Promise((resolve) => {
            this.html(object.uri).then((html) => {
                const match = /<img src="(.*)" style=".*" alt="(.*)" class="image" \/>\s+<div class="scp-image-caption" style=".*">\s+<p>(.*)<\/p>/mgi.exec(html);
                resolve(match ? {
                    uri: match[1],
                    alt: match[2],
                    title: match[3]
                } : null);
            });
        });
    }
}
;
