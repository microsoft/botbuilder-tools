import { IRole } from './composers/IRole';

/**
 * @description
 * Represents a LUIS simple entity.
 */
export interface IEntity {
    name: string;

    roles: IRole[];
}
