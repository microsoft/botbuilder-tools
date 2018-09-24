/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
export function uuidValidate(value: string): boolean {
    return /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/.test(value);
}

export function showMessage(value: string): string {
    return `${process.env.VERBOSE === 'verbose' ? '[msbot] ' : ''}${value}`;
}

export const RegionCodes = {
    AUSTRALIAEAST: 'australiaeast',
    AUSTRALIACENTRAL: 'australiacentral',
    AUSTRALIACENTRAL2: 'australiacentral2',
    AUSTRALIASOUTHEAST: 'australiasoutheast',
    EASTASIA: 'eastasia',
    SOUTHEASTASIA: 'southeastasia',
    EASTUS: 'eastus',
    EASTUS2: 'eastus2',
    SOUTHCENTRALUS: 'southcentralus',
    WESTCENTRALUS: 'westcentralus',
    WESTUS: 'westus',
    WESTUS2: 'westus2',
    BRAZILSOUTH: 'brazilsouth',
    CENTRALUS: 'centralus',
    NORTHCENTRALUS: 'northcentralus',
    JAPANWEST: 'japanwest',
    JAPANEAST: 'japaneast',
    SOUTHINDIA: 'southindia',
    CENTRALINDIA: 'centralindia',
    WESTINDIA: 'westindia',
    CANADACENTRAL: 'canadacentral',
    CANADAEAST: 'canadaeast',
    KOREACENTRAL: 'koreacentral',
    KOREASOUTH: 'koreasouth',
    GERMANYCENTRAL: 'germanycentral',
    GERMANYNORTHEAST: 'germanynortheast',
    NORTHEUROPE: 'northeurope',
    WESTEUROPE: 'westeurope',
    UKSOUTH: 'uksouth',
    UKWEST: 'ukwest',
    FRANCECENTRAL: 'francecentral',
    FRANCESOUTH: 'francesouth'
};

export const RegionNames = {
    AUSTRALIAEAST: 'Australia East',
    AUSTRALIACENTRAL: 'Australia Central',
    AUSTRALIACENTRAL2: 'Australia Central 2',
    AUSTRALIASOUTHEAST: 'Australia Southeast',
    EASTASIA: 'East Asia',
    SOUTHEASTASIA: 'Southeast Asia',
    EASTUS: 'East US',
    EASTUS2: 'East US 2',
    SOUTHCENTRALUS: 'South Central US',
    WESTCENTRALUS: 'West Central US',
    WESTUS: 'West US',
    WESTUS2: 'West US 2',
    BRAZILSOUTH: 'Brazil South',
    CENTRALUS: 'Central US',
    NORTHCENTRALUS: 'North Central US',
    JAPANWEST: 'Japan West',
    JAPANEAST: 'Japan East',
    SOUTHINDIA: 'South India',
    CENTRALINDIA: 'Central India',
    WESTINDIA: 'West India',
    CANADACENTRAL: 'Canada Central',
    CANADAEAST: 'Canada East',
    KOREACENTRAL: 'Korea Central',
    KOREASOUTH: 'Korea South',
    GERMANYCENTRAL: 'Germany Central',
    GERMANYNORTHEAST: 'Germany Northeast',
    NORTHEUROPE: 'North Europe',
    WESTEUROPE: 'West Europe',
    UKSOUTH: 'UK South',
    UKWEST: 'UK West',
    FRANCECENTRAL: 'France Central',
    FRANCESOUTH: 'France South'
};

export const regionToLuisAuthoringRegionMap: { [region: string]: string } = {
    australiaeast: RegionCodes.AUSTRALIAEAST,
    australiacentral: RegionCodes.AUSTRALIAEAST,
    australiacentral2: RegionCodes.AUSTRALIAEAST,
    australiasoutheast: RegionCodes.AUSTRALIAEAST,
    eastasia: RegionCodes.WESTUS,
    southeastasia: RegionCodes.WESTUS,
    eastus: RegionCodes.WESTUS,
    eastus2: RegionCodes.WESTUS,
    southcentralus: RegionCodes.WESTUS,
    westcentralus: RegionCodes.WESTUS,
    westus: RegionCodes.WESTUS,
    westus2: RegionCodes.WESTUS,
    brazilsouth: RegionCodes.WESTUS,
    centralus: RegionCodes.WESTUS,
    northcentralus: RegionCodes.WESTUS,
    japanwest: RegionCodes.WESTUS,
    japaneast: RegionCodes.WESTUS,
    southindia: RegionCodes.WESTUS,
    centralindia: RegionCodes.WESTUS,
    westindia: RegionCodes.WESTUS,
    canadacentral: RegionCodes.WESTUS,
    canadaeast: RegionCodes.WESTUS,
    koreacentral: RegionCodes.WESTUS,
    koreasouth: RegionCodes.WESTUS,
    northeurope: RegionCodes.WESTEUROPE,
    westeurope: RegionCodes.WESTEUROPE,
    uksouth: RegionCodes.WESTEUROPE,
    ukwest: RegionCodes.WESTEUROPE,
    francecentral: RegionCodes.WESTEUROPE,
    francesouth: RegionCodes.WESTEUROPE,
    germanycentral: RegionCodes.WESTEUROPE,
    germanynortheast: RegionCodes.WESTEUROPE
}

export const regionToLuisPublishRegionMap: { [region: string]: string } = {
    australiaeast: RegionCodes.AUSTRALIAEAST,
    australiacentral: RegionCodes.AUSTRALIAEAST,
    australiacentral2: RegionCodes.AUSTRALIAEAST,
    australiasoutheast: RegionCodes.AUSTRALIAEAST,
    eastasia: RegionCodes.SOUTHEASTASIA,
    southeastasia: RegionCodes.SOUTHEASTASIA,
    eastus: RegionCodes.EASTUS,
    eastus2: RegionCodes.EASTUS2,
    southcentralus: RegionCodes.SOUTHCENTRALUS,
    westcentralus: RegionCodes.WESTCENTRALUS,
    westus: RegionCodes.WESTUS,
    westus2: RegionCodes.WESTUS2,
    brazilsouth: RegionCodes.BRAZILSOUTH,
    centralus: RegionCodes.SOUTHCENTRALUS,
    northcentralus: RegionCodes.WESTCENTRALUS,
    japanwest: RegionCodes.SOUTHEASTASIA,
    japaneast: RegionCodes.SOUTHEASTASIA,
    southindia: RegionCodes.SOUTHEASTASIA,
    centralindia: RegionCodes.SOUTHEASTASIA,
    westindia: RegionCodes.SOUTHEASTASIA,
    canadacentral: RegionCodes.WESTCENTRALUS,
    canadaeast: RegionCodes.EASTUS,
    koreacentral: RegionCodes.SOUTHEASTASIA,
    koreasouth: RegionCodes.SOUTHEASTASIA,
    northeurope: RegionCodes.NORTHEUROPE,
    westeurope: RegionCodes.WESTEUROPE,
    uksouth: RegionCodes.WESTEUROPE,
    ukwest: RegionCodes.WESTEUROPE,
    francecentral: RegionCodes.NORTHEUROPE,
    francesouth: RegionCodes.WESTEUROPE,
    germanycentral: RegionCodes.WESTEUROPE,
    germanynortheast: RegionCodes.NORTHEUROPE
}

export const regionToAppInsightRegionNameMap: { [region: string]: string } = {
    australiaeast: RegionNames.SOUTHEASTASIA,
    australiacentral: RegionNames.SOUTHEASTASIA,
    australiacentral2: RegionNames.SOUTHEASTASIA,
    australiasoutheast: RegionNames.SOUTHEASTASIA,
    eastasia: RegionNames.SOUTHEASTASIA,
    southeastasia: RegionNames.SOUTHEASTASIA,
    japanwest: RegionNames.SOUTHEASTASIA,
    japaneast: RegionNames.SOUTHEASTASIA,
    southindia: RegionNames.SOUTHEASTASIA,
    centralindia: RegionNames.SOUTHEASTASIA,
    westindia: RegionNames.SOUTHEASTASIA,
    koreacentral: RegionNames.SOUTHEASTASIA,
    koreasouth: RegionNames.SOUTHEASTASIA,

    eastus: RegionNames.EASTUS,
    eastus2: RegionNames.EASTUS,
    canadaeast: RegionNames.EASTUS,

    southcentralus: RegionNames.SOUTHCENTRALUS,
    brazilsouth: RegionNames.SOUTHCENTRALUS,
    centralus: RegionNames.SOUTHCENTRALUS,
    northcentralus: RegionNames.SOUTHCENTRALUS,
    canadacentral: RegionNames.SOUTHCENTRALUS,

    westcentralus: RegionNames.WESTUS2,
    westus: RegionNames.WESTUS2,
    westus2: RegionNames.WESTUS2,

    northeurope: RegionNames.NORTHEUROPE,

    westeurope: RegionNames.WESTEUROPE,
    uksouth: RegionNames.WESTEUROPE,
    ukwest: RegionNames.WESTEUROPE,
    francecentral: RegionNames.WESTEUROPE,
    francesouth: RegionNames.WESTEUROPE,
    germanycentral: RegionNames.WESTEUROPE,
    germanynortheast: RegionNames.WESTEUROPE
}

export const regionToSearchRegionMap: { [region: string]: string } = {
    australiaeast: RegionCodes.SOUTHEASTASIA,
    australiacentral: RegionCodes.SOUTHEASTASIA,
    australiacentral2: RegionCodes.SOUTHEASTASIA,
    australiasoutheast: RegionCodes.SOUTHEASTASIA,
    eastasia: RegionCodes.SOUTHEASTASIA,
    southeastasia: RegionCodes.SOUTHEASTASIA,

    eastus: RegionCodes.EASTUS,
    eastus2: RegionCodes.EASTUS2,
    southcentralus: RegionCodes.SOUTHCENTRALUS,
    westcentralus: RegionCodes.WESTCENTRALUS,
    westus: RegionCodes.WESTUS,
    westus2: RegionCodes.WESTUS2,
    centralus: RegionCodes.WESTCENTRALUS,
    northcentralus: RegionCodes.SOUTHCENTRALUS,
    canadacentral: RegionCodes.SOUTHCENTRALUS,
    canadaeast: RegionCodes.EASTUS,

    brazilsouth: RegionCodes.BRAZILSOUTH,

    japanwest: RegionCodes.JAPANEAST,
    japaneast: RegionCodes.JAPANEAST,
    southindia: RegionCodes.CENTRALINDIA,
    centralindia: RegionCodes.CENTRALINDIA,
    westindia: RegionCodes.CENTRALINDIA,
    koreacentral: RegionCodes.EASTASIA,
    koreasouth: RegionCodes.EASTASIA,

    northeurope: RegionCodes.NORTHEUROPE,
    westeurope: RegionCodes.WESTEUROPE,
    uksouth: RegionCodes.UKSOUTH,
    ukwest: RegionCodes.UKSOUTH,
    francecentral: RegionCodes.WESTEUROPE,
    francesouth: RegionCodes.WESTEUROPE,
    germanycentral: RegionCodes.WESTEUROPE,
    germanynortheast: RegionCodes.NORTHEUROPE
}

export const luisAuthoringRegions = [
    RegionCodes.AUSTRALIAEAST,
    RegionCodes.WESTEUROPE,
    RegionCodes.WESTUS
];


export const luisPublishRegions = [
    RegionCodes.AUSTRALIAEAST,
    RegionCodes.NORTHEUROPE,
    RegionCodes.WESTEUROPE,
    RegionCodes.EASTASIA,
    RegionCodes.SOUTHEASTASIA,
    RegionCodes.EASTUS,
    RegionCodes.EASTUS2,
    RegionCodes.SOUTHCENTRALUS,
    RegionCodes.WESTCENTRALUS,
    RegionCodes.WESTUS,
    RegionCodes.WESTUS2,
    RegionCodes.BRAZILSOUTH
];

export const searchRegions = [
    RegionCodes.NORTHEUROPE,
    RegionCodes.WESTEUROPE,
    RegionCodes.UKSOUTH,

    RegionCodes.CENTRALINDIA,
    RegionCodes.SOUTHEASTASIA,
    RegionCodes.EASTASIA,
    RegionCodes.JAPANEAST,
    RegionCodes.AUSTRALIAEAST,

    RegionCodes.BRAZILSOUTH,

    RegionCodes.WESTUS,
    RegionCodes.WESTUS2,
    RegionCodes.EASTUS,
    RegionCodes.EASTUS2,
    RegionCodes.WESTCENTRALUS,
    RegionCodes.SOUTHCENTRALUS,
    RegionCodes.CANADACENTRAL
];

const appInsightRegions = [
    RegionCodes.SOUTHEASTASIA,
    RegionCodes.WESTUS2,
    RegionCodes.SOUTHCENTRALUS,
    RegionCodes.WESTEUROPE,
    RegionCodes.NORTHEUROPE,
];
