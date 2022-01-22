import https from 'https';

import Series from './Series.js';
import Object from './Object.js';

type ObjectTag = {
    uri: string;
    title: string;
};

type ObjectImage = {
    uri: string;
    alt: string;
    title: string;
};

export default abstract class AbstractBranch
{
    public readonly uri: string;
    
    protected _html: object = {};

    public constructor(uri: string)
    {
        this.uri = uri;
    }

    public html(page: string = ''): Promise<string>
    {
        return new Promise((resolve) => {
            if (this._html[page] === undefined)
            {
                https.get(`${this.uri}/${page}`, (res) => {
                    res.on('data', (data) => this._html[page] += data ?? '');
                    res.on('end', () => resolve(this._html[page]));
                });
            }

            else resolve(this._html[page]);
        });
    }

    public series(): Promise<Series[]>
    {
        return new Promise(async (resolve) => {
            let html = await this.html();

            let series: Series[] = [], i = 1, match;

            while (match = /<a href="\/(scp-series|scp-series-[\d]+)">([\w\d\s]+)<\/a>/mgi.exec(html))
            {
                series.push(new Series(i++, match[2], match[1], this));

                html = html.replace(match[0], '');
            }

            resolve(series);
        });
    }

    public objects(series: Series): Promise<Object[]>
    {
        return new Promise(async (resolve) => {
            let html = await this.html(series.uri);

            let objects: Object[] = [], i = 1, match;

            while (match = /<li><a href="\/(scp-[\d]+)">SCP-[\d]+<\/a> - (.*)<\/li>[\s]{1}/mgi.exec(html))
            {
                objects.push(new Object(i++, match[2], match[1], this));

                html = html.replace(match[0], '');
            }

            resolve(objects);
        });
    }

    public getObjectTags(object: Object): Promise<ObjectTag[]>
    {
        return new Promise((resolve) => {
            this.html(object.uri).then((html) => {
                let tags: ObjectTag[] = [], i = 1, match;

                while (match = /<a href="\/(system:page-tags\/tag\/[\w\d\-_]+#pages)">([\w\d\-_]+)<\/a>/mgi.exec(html))
                {
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

    public getObjectRating(object: Object): Promise<number|null>
    {
        return new Promise((resolve) => {
            this.html(object.uri).then((html) => {
                const match = /<span class="rate-points">rating:&nbsp;<span class="number [\w\d]+">([\d\+\-]+)<\/span><\/span>/mgi.exec(html);

                resolve(match ? parseInt(match[1]) : null);
            });
        });
    }

    public getObjectImage(object: Object): Promise<ObjectImage|null>
    {
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
};

export type { ObjectTag, ObjectImage };
