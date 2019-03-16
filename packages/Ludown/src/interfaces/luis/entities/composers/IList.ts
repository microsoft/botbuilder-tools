import { ISublist } from './ISublist';

/**
 * @description
 * Represents a composition for an entity that allows sub listing.
 */
export interface IList {
	subLists: ISublist[];
}
