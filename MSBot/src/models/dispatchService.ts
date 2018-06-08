/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { IDispatchService, ServiceType } from '../schema';
import { ConnectedService } from './connectedService';

export class DispatchService extends ConnectedService implements IDispatchService {
    public name = '';
    public id = '';
    public readonly type = ServiceType.Dispatch;
    public appId = '';
    public authoringKey = '';
    public authoringEndpoint = '';
    public serviceIds: string[] = [];
    public subscriptionKey = '';
    public publishedEndpoint = '';
    public version = '';

    constructor(source: IDispatchService = {} as IDispatchService) {
        super(source);
        const { appId = '', authoringKey = '', serviceIds = [], subscriptionKey = '', version = '' } = source;
        this.id = appId;
        Object.assign(this, { appId, authoringKey, serviceIds, subscriptionKey, version });
    }

    public toJSON(): IDispatchService {
        const { appId, authoringKey, authoringEndpoint, name, serviceIds, subscriptionKey, publishedEndpoint, version } = this;
        return {  type: ServiceType.Dispatch, id: this.appId, name, appId, authoringKey, authoringEndpoint, serviceIds, subscriptionKey, publishedEndpoint, version };
    }
}
