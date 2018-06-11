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
    public subscriptionKey = '';
    public readonly type = ServiceType.Luis;
    public version = '';

    constructor(source: ILuisService = {} as ILuisService) {
        super(source);
        const { appId = '', authoringKey = '', subscriptionKey = '', version = '' } = source;
        this.id = appId;
        Object.assign(this, { appId, authoringKey, subscriptionKey, version });
    }

    public toJSON(): ILuisService {
        const { appId, authoringKey, authoringEndpoint, id, name, subscriptionKey, publishedEndpoint, type, version } = this;
        return { type: ServiceType.Luis, id: appId, name, version, appId, authoringKey, authoringEndpoint, subscriptionKey, publishedEndpoint };
    }
}
