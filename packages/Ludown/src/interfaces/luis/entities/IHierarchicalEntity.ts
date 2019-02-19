import { IParent } from './composers/IParent';
import { IEntity } from './IEntity';

/**
 * @description
 * Represents a LUIS hierarchical entity.
 */
export interface IHierarchicalEntity extends IEntity, IParent { }
