import AbstractBranch from '../AbstractBranch.js';

import { branches } from '../index.js';

export default class English extends AbstractBranch
{
    public constructor()
    {
        super(branches['en-us']);
    }
};
