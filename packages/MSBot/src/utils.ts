/**
 * Copyright(c) Microsoft Corporation.All rights reserved.
 * Licensed under the MIT License.
 */
const pkg = require('../package.json');
const intercept = require("intercept-stdout");

export function uuidValidate(value: string): boolean {
    return /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/.test(value);
}

// tslint:disable-next-line:typedef
const unhookIntercept = intercept((txt: string) => {
    return `${process.env.PREFIX === 'prefix' ? `[${pkg.name}] ` : ''}${txt}`;
});
exports.unhook_intercept = unhookIntercept;

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
    FRANCESOUTH: 'francesouth',
    VIRGINIA: 'virginia',
    USGOVVIRGINIA: 'usgovvirginia',
    USGOVIOWA: 'usgoviowa',
    USDODEAST: 'usdodeast',
    USDODCENTRAL: 'usdodcentral',
    USGOVTEXAS: 'usgovtexas',
    USGOVARIZONA: 'usgovarizona'
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
    FRANCESOUTH: 'France South',
    VIRGINIA: 'Virginia',
    USGOVVIRGINIA: 'USGov Virginia',
    USGOVIOWA: "USGov Iowa",
    USDODEAST: "USDoD East",
    USDODCENTRAL: "USDoD Central",
    USGOVTEXAS: "USGov Texas",
    USGOVARIZONA: "USGov Arizona"
};

export const LuisAuthoringRegionCodes = {
    AUSTRALIAEAST: RegionCodes.AUSTRALIAEAST,
    WESTEUROPE: RegionCodes.WESTEUROPE,
    WESTUS: RegionCodes.WESTUS,
    VIRGINIA: RegionCodes.VIRGINIA
};

export const regionToLuisAuthoringRegionMap: { [region: string]: string } = {
    australiaeast: LuisAuthoringRegionCodes.AUSTRALIAEAST,
    australiacentral: LuisAuthoringRegionCodes.AUSTRALIAEAST,
    australiacentral2: LuisAuthoringRegionCodes.AUSTRALIAEAST,
    australiasoutheast: LuisAuthoringRegionCodes.AUSTRALIAEAST,
    eastasia: LuisAuthoringRegionCodes.WESTUS,
    southeastasia: LuisAuthoringRegionCodes.WESTUS,
    eastus: LuisAuthoringRegionCodes.WESTUS,
    eastus2: LuisAuthoringRegionCodes.WESTUS,
    southcentralus: LuisAuthoringRegionCodes.WESTUS,
    westcentralus: LuisAuthoringRegionCodes.WESTUS,
    westus: LuisAuthoringRegionCodes.WESTUS,
    westus2: LuisAuthoringRegionCodes.WESTUS,
    brazilsouth: LuisAuthoringRegionCodes.WESTUS,
    centralus: LuisAuthoringRegionCodes.WESTUS,
    northcentralus: LuisAuthoringRegionCodes.WESTUS,
    japanwest: LuisAuthoringRegionCodes.WESTUS,
    japaneast: LuisAuthoringRegionCodes.WESTUS,
    southindia: LuisAuthoringRegionCodes.WESTUS,
    centralindia: LuisAuthoringRegionCodes.WESTUS,
    westindia: LuisAuthoringRegionCodes.WESTUS,
    canadacentral: LuisAuthoringRegionCodes.WESTUS,
    canadaeast: LuisAuthoringRegionCodes.WESTUS,
    koreacentral: LuisAuthoringRegionCodes.WESTUS,
    koreasouth: LuisAuthoringRegionCodes.WESTUS,
    northeurope: LuisAuthoringRegionCodes.WESTEUROPE,
    westeurope: LuisAuthoringRegionCodes.WESTEUROPE,
    uksouth: LuisAuthoringRegionCodes.WESTEUROPE,
    ukwest: LuisAuthoringRegionCodes.WESTEUROPE,
    francecentral: LuisAuthoringRegionCodes.WESTEUROPE,
    francesouth: LuisAuthoringRegionCodes.WESTEUROPE,
    germanycentral: LuisAuthoringRegionCodes.WESTEUROPE,
    germanynortheast: LuisAuthoringRegionCodes.WESTEUROPE,
    virginia: LuisAuthoringRegionCodes.VIRGINIA,
    usgovvirginia: LuisAuthoringRegionCodes.VIRGINIA,
    usgoviowa: LuisAuthoringRegionCodes.VIRGINIA,
    usdodeast: LuisAuthoringRegionCodes.VIRGINIA,
    usdodcentral: LuisAuthoringRegionCodes.VIRGINIA,
    usgovtexas: LuisAuthoringRegionCodes.VIRGINIA,
    usgovarizona: LuisAuthoringRegionCodes.VIRGINIA
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
    germanynortheast: RegionCodes.NORTHEUROPE,
    virginia: RegionCodes.VIRGINIA,
    usgovvirginia: RegionCodes.VIRGINIA,
    usgoviowa: RegionCodes.VIRGINIA,
    usdodeast: RegionCodes.VIRGINIA,
    usdodcentral: RegionCodes.VIRGINIA,
    usgovtexas: RegionCodes.VIRGINIA,
    usgovarizona: RegionCodes.VIRGINIA,
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
    germanynortheast: RegionNames.WESTEUROPE,

    // usgovvirginia: RegionNames.USGOVVIRGINIA,
    // usgoviowa: RegionNames.USGOVVIRGINIA,
    // usdodeast: RegionNames.USGOVVIRGINIA,
    // usdodcentral: RegionNames.USGOVVIRGINIA,
    // usgovtexas: RegionNames.USGOVVIRGINIA,
    // usgovarizona: RegionNames.USGOVVIRGINIA
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
    germanynortheast: RegionCodes.NORTHEUROPE,

    // usgovvirginia: RegionNames.USGOVVIRGINIA,
    // usgoviowa: RegionNames.USGOVVIRGINIA,
    // usdodeast: RegionNames.USGOVVIRGINIA,
    // usdodcentral: RegionNames.USGOVVIRGINIA,
    // usgovtexas: RegionNames.USGOVVIRGINIA,
    // usgovarizona: RegionNames.USGOVVIRGINIA
}


export const luisAuthoringRegions = [
    RegionCodes.AUSTRALIAEAST,
    RegionCodes.WESTEUROPE,
    RegionCodes.WESTUS,
    RegionCodes.VIRGINIA
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
    RegionCodes.BRAZILSOUTH,
    RegionCodes.VIRGINIA
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

