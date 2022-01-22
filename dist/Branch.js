import English from './branches/English.js';
export default class Branch {
    static get(branch) {
        switch (branch) {
            case 'en-us':
                return new English;
        }
    }
}
;
