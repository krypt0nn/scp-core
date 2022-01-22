import type { Branch as Branches } from './index.js';
import AbstractBranch from './AbstractBranch.js';
export default abstract class Branch {
    static get(branch: Branches): AbstractBranch;
}
