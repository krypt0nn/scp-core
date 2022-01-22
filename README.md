# scp-core

```ts
import Branch from 'scp-core/Branch';

const branch = Branch.get('en-us');

branch.series().then((series) => {
    series[0].objects().then(async (objects) => {
        const scp009 = objects.find((object) => object.title == 'Red Ice');

        console.log(`${scp009.uri} - ${scp009.title} [rating: ${await scp009.rating}] (tags: ${(await scp009.tags).map((tag) => tag.title).join(', ')})`);
    });
});
```

<br>

Author: [Nikita Podvirnyy](https://vk.com/technomindlp)

Licensed under [GNU GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)
