import { IList } from './composers/IList';
import { IEntity } from './IEntity';

/**
 * @description
 * Represents a LUIS list entity.
 */
export interface IListEntity extends IEntity, IList {}
