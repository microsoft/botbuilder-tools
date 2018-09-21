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


export class RegionCodes {
    static AUSTRALIAEAST = 'australiaeast';
    static AUSTRALIACENTRAL = 'australiacentral';
    static AUSTRALIACENTRAL2 = 'australiacentral2';
    static AUSTRALIASOUTHEAST = 'australiasoutheast';
    static EASTASIA = 'eastasia';
    static SOUTHEASTASIA = 'southeastasia';
    static EASTUS = 'eastus';
    static EASTUS2 = 'eastus2';
    static SOUTHCENTRALUS = 'southcentralus';
    static WESTCENTRALUS = 'westcentralus';
    static WESTUS = 'westus';
    static WESTUS2 = 'westus2';
    static BRAZILSOUTH = 'brazilsouth';
    static CENTRALUS = 'centralus';
    static NORTHCENTRALUS = 'northcentralus';
    static JAPANWEST = 'japanwest';
    static JAPANEAST = 'japaneast';
    static SOUTHINDIA = 'southindia';
    static CENTRALINDIA = 'centralindia';
    static WESTINDIA = 'westindia';
    static CANADACENTRAL = 'canadacentral';
    static CANADAEAST = 'canadaeast';
    static KOREACENTRAL = 'koreacentral';
    static KOREASOUTH = 'koreasouth';
    static NORTHEUROPE = 'northeurope';
    static WESTEUROPE = 'westeurope';
    static UKSOUTH = 'uksouth';
    static UKWEST = 'ukwest';
    static FRANCECENTRAL = 'francecentral';
    static FRANCESOUTH = 'francesouth';
}

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
    canadacentral: RegionCodes.NORTHCENTRALUS,
    canadaeast: RegionCodes.EASTUS,
    koreacentral: RegionCodes.SOUTHEASTASIA,
    koreasouth: RegionCodes.SOUTHEASTASIA,
    northeurope: RegionCodes.NORTHCENTRALUS,
    westeurope: RegionCodes.WESTEUROPE,
    uksouth: RegionCodes.WESTEUROPE,
    ukwest: RegionCodes.WESTEUROPE,
    francecentral: RegionCodes.NORTHEUROPE,
    francesouth: RegionCodes.WESTEUROPE,
}

const LONG_EASTUS = 'East US';
const LONG_NORTHEUROPE = 'North Europe';
const LONG_SOUTHCENTRALUS = 'South Central US';
const LONG_SOUTHEASTASIA = 'Southeast Asia';
const LONG_WESTEUROPE = 'West Europe';
const LONG_WESTUS2 = 'West US 2';


export const regionToAppInsightLongRegionMap: { [region: string]: string } = {
    australiaeast: LONG_SOUTHEASTASIA,
    australiacentral: LONG_SOUTHEASTASIA,
    australiacentral2: LONG_SOUTHEASTASIA,
    australiasoutheast: LONG_SOUTHEASTASIA,
    eastasia: LONG_SOUTHEASTASIA,
    southeastasia: LONG_SOUTHEASTASIA,
    japanwest: LONG_SOUTHEASTASIA,
    japaneast: LONG_SOUTHEASTASIA,
    southindia: LONG_SOUTHEASTASIA,
    centralindia: LONG_SOUTHEASTASIA,
    westindia: LONG_SOUTHEASTASIA,
    koreacentral: LONG_SOUTHEASTASIA,
    koreasouth: LONG_SOUTHEASTASIA,

    eastus: LONG_EASTUS,
    eastus2: LONG_EASTUS,
    canadaeast: LONG_EASTUS,

    southcentralus: LONG_SOUTHCENTRALUS,
    brazilsouth: LONG_SOUTHCENTRALUS,
    centralus: LONG_SOUTHCENTRALUS,
    northcentralus: LONG_SOUTHCENTRALUS,
    canadacentral: LONG_SOUTHCENTRALUS,

    westcentralus: LONG_WESTUS2,
    westus: LONG_WESTUS2,
    westus2: LONG_WESTUS2,

    northeurope: LONG_NORTHEUROPE,

    westeurope: LONG_WESTEUROPE,
    uksouth: LONG_WESTEUROPE,
    ukwest: LONG_WESTEUROPE,
    francecentral: LONG_WESTEUROPE,
    francesouth: LONG_WESTEUROPE
}

export const luisRegions = [
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

