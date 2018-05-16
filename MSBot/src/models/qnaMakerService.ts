/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
import { IQnAService, ServiceType } from '../schema';
import { ConnectedService } from './connectedService';
import * as url from 'url';

export class QnaMakerService extends ConnectedService implements IQnAService {
    public readonly type = ServiceType.QnA;
    public kbId = '';
    public subscriptionKey = '';
    public hostname = '';
    public endpointKey = '';
    public environment = 'prod';

    constructor(source: IQnAService = {} as IQnAService) {
        super(source);
        let { id = '', name = '', kbId = '', subscriptionKey = '', endpointKey = '', hostname = '', environment = '' } = source;
        this.id = kbId;
        hostname = url.resolve(source.hostname, '/qnamaker');
        Object.assign(this, { id, name, kbId, subscriptionKey, endpointKey, hostname, environment });
    }

    public toJSON(): IQnAService {
        const { id, name, kbId, subscriptionKey, endpointKey, hostname, environment} = this;
        return { type: ServiceType.QnA, id: kbId, name, kbId, subscriptionKey, endpointKey, hostname, environment };
    }
}
