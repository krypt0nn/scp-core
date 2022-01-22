import type { Branch as Branches } from './index.js';

import AbstractBranch from './AbstractBranch.js';

import English from './branches/English.js';

export default abstract class Branch
{
    public static get(branch: Branches): AbstractBranch
    {
        switch (branch)
        {
            case 'en-us':
                return new English;
        }
    }
};
