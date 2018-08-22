import { BotConfigModel } from './models';
import { IConnectedService, ServiceType } from './schema';
export declare class BotConfig extends BotConfigModel {
    protected encryptedProperties: {
        [key: string]: string[];
    };
    private internal;
    constructor(secret?: string);
    static LoadBotFromFolder(folder?: string, secret?: string): Promise<BotConfig>;
    static Load(botpath: string, secret?: string): Promise<BotConfig>;
    save(botpath?: string): Promise<void>;
    clearSecret(): void;
    connectService(newService: IConnectedService): void;
    encryptAll(): void;
    decryptAll(): void;
    disconnectServiceByNameOrId(nameOrId: string): IConnectedService;
    disconnectService(type: string, id: string): void;
    encryptValue(value: string): string;
    decryptValue(encryptedValue: string): string;
    validateSecretKey(): void;
    getEncryptedProperties(type: ServiceType): string[];
    private encryptService;
    private decryptService;
    private internalEncrypt;
    private internalDecrypt;
}
