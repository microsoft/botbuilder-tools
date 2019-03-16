import { IEntity } from '../entities/IEntity';
import { IHierarchicalEntity } from '../entities/IHierarchicalEntity';
import { IListEntity } from '../entities/IListEntity';
import { IRegexEntity } from '../entities/IRegexEntity';
import { IPhraseList } from '../features/IPhraseList';
import { IIntent } from '../intents/IIntent';
import { IPattern } from '../patterns/IPattern';
import { IUtterance } from '../utterances/IUtterance';

/**
 * @description
 * Represents a LUIS app's useful information from the point of view
 * of the ludown tool.
 */
export interface ILuisApp {
	intents?: IIntent[];

	entities?: IEntity[];

	patternEntities?: IEntity[];

	regexEntities?: IRegexEntity[];

	hierarchicalEntities?: IHierarchicalEntity[];

	listEntities?: IListEntity[];

	prebuiltEntities?: IEntity[];

	phraseLists?: IPhraseList[];

	utterances?: IUtterance[];

	patterns?: IPattern[];
}
