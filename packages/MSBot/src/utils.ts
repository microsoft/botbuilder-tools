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

export const regionToLuisAuthoringRegionMap: { [region: string]: string } = {
    australiaeast: 'australiaeast',
    australiacentral: 'australiaeast',
    australiacentral2: 'australiaeast',
    australiasoutheast: 'australiaeast',
    eastasia: 'westus',
    southeastasia: 'westus',
    eastus: 'westus',
    eastus2: 'westus',
    southcentralus: 'westus',
    westcentralus: 'westus',
    westus: 'westus',
    westus2: 'westus',
    brazilsouth: 'westus',
    centralus: 'westus',
    northcentralus: 'westus',
    japanwest: 'westus',
    japaneast: 'westus',
    southindia: 'westus',
    centralindia: 'westus',
    westindia: 'westus',
    canadacentral: 'westus',
    canadaeast: 'westus',
    koreacentral: 'westus',
    koreasouth: 'westus',
    northeurope: 'westeurope',
    westeurope: 'westeurope',
    uksouth: 'westeurope',
    ukwest: 'westeurope',
    francecentral: 'westeurope',
    francesouth: 'westeurope'
}

const LONG_EASTUS='East US';
const LONG_NORTHEUROPE='North Europe';
const LONG_SOUTHCENTRALUS='South Central US';
const LONG_SOUTHEASTASIA='Southeast Asia';
const LONG_WESTEUROPE='West Europe';
const LONG_WESTUS2='West US 2';


export const regionToAppInsightRegionMap: { [region: string]: string } = {
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
    `australiaeast`,
    `northeurope`,
    `westeurope`,
    `eastasia`,
    `southeastasia`,
    `eastus`,
    `eastus2`,
    `southcentralus`,
    `westcentralus`,
    `westus`,
    `westus2`,
    `brazilsouth`
];