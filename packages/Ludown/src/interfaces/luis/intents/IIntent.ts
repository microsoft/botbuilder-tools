import { IPattern } from '../patterns/IPattern';
import { IUtterance } from '../utterances/IUtterance';

/**
 * @description
 * Represents a LUIS intent.
 */
export interface IIntent {
    name: string;
}

/**
 * @description
 * Represnts data that is relevant to an intent.
 */
export interface IIntentData {
    utterances: IUtterance[];

    patterns: IPattern[];
}
