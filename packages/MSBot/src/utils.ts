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

export const regionToAuthoringRegionMap: { [region: string]: string } = {
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