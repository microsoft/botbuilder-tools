/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { ILuisService, ServiceType } from '../schema';
import { ConnectedService } from './connectedService';

export class LuisService extends ConnectedService implements ILuisService {
    public authoringKey = '';
    public authoringEndpoint = '';
    public id = '';
    public name = '';
    public appId = '';
    public publishedEndpoint = '';
    public publishedKey = '';
    public readonly type = ServiceType.Luis;
    public versionId = '';

    constructor(source: ILuisService = {} as ILuisService) {
        super(source);
        const { appId = '', authoringKey = '', publishedKey = '', versionId = '' } = source;
        this.id = appId;
        Object.assign(this, { appId, authoringKey, publishedKey, versionId });
    }

    public toJSON(): ILuisService {
        const { appId, authoringKey, authoringEndpoint, id, name, publishedKey, publishedEndpoint, type, versionId } = this;
        return { type: ServiceType.Luis, id: appId, name, versionId, appId, authoringKey, authoringEndpoint, publishedKey, publishedEndpoint };
    }
}
