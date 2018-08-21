/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { ILuisService, ServiceType } from '../schema';
import { ConnectedService } from './connectedService';

export class LuisService extends ConnectedService implements ILuisService {
    public readonly type = ServiceType.Luis;
    public appId = '';
    public authoringKey = '';
    public subscriptionKey = '';
    public version = '';
    public endpointBasePath = '';

    constructor(source: ILuisService = {} as ILuisService) {
        super(source);
        const { appId = '', authoringKey = '', subscriptionKey = '', version = '', endpointBasePath = '' } = source;
        this.id = appId;
        Object.assign(this, { appId, authoringKey, subscriptionKey, version, endpointBasePath });
    }

    public toJSON(): ILuisService {
        const { appId, authoringKey, id, name, subscriptionKey, type, version, endpointBasePath } = this;
        return { type: ServiceType.Luis, id: appId, name, version, appId, authoringKey, subscriptionKey, endpointBasePath };
    }
}
