import AbstractBranch from '../AbstractBranch.js';
import { branches } from '../index.js';
export default class Russian extends AbstractBranch {
    constructor() {
        super(branches['ru-ru']);
    }
}
;
