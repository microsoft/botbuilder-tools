let bf = require('botframework-config');
let assert = require('assert');
let util = require('util');
let fs = require('fs');
let utils = require('../bin/utils');
let exec = util.promisify(require('child_process').exec);
const msbot = require.resolve('../bin/msbot.js');
const botConfig = require.resolve('./bot.txt');

const AllNames = [
    `East Asia`,
    `Southeast Asia`,
    `Australia Central`,
    `Australia Central 2`,
    `Australia East`,
    `Australia Southeast`,
    `Germany Central`,
    `Germany Northeast`,
    `Brazil South`,
    `Canada Central`,
    `Canada East`,
    `North Europe`,
    `West Europe`,
    `France Central`,
    `France South`,
    `Central India`,
    `South India`,
    `West India`,
    `Japan East`,
    `Japan West`,
    `Korea Central`,
    `Korea South`,
    `UK South`,
    `UK West`,
    `Central US`,
    `East US`,
    `East US 2`,
    `North Central US`,
    `South Central US`,
    `West Central US`,
    `West US`,
    `West US 2`,
];
const AllRegions = [];
for (const name of AllNames)
    AllRegions.push(name.toLowerCase().replace(/ /g, ''));

describe("region tests", () => {
    
    it("test region codes all there", async () => {
        for (let region of AllRegions) {
            assert.ok(Object.values(utils.RegionCodes).find((r) => r == region), `missing ${region}`);
        }

        for (let region of Object.values(utils.RegionCodes)) {
            assert.ok(AllRegions.find((r) => r == region), `extra ${region}`);
        }

    });

    it("test region names all there", async () => {
        for (let name of AllNames) {
            assert.ok(Object.values(utils.RegionNames).find((n) => n == name), `missing ${name}`);
        }

        for (let name of Object.values(utils.RegionNames)) {
            assert.ok(AllNames.find((n) => n == name), `extra ${name}`);
        }

    });

    it("regionToAppInsightRegionNameMap should have valid AppInsight region", async () => {
        for (let targetRegion of Object.values(utils.regionToAppInsightRegionNameMap)) {
            assert.ok(Object.values(utils.RegionNames).find(r => r == targetRegion), `${targetRegion} is not a valid region code for appinsights`);
        }
    });

    it("regionToLuisAuthoringRegionMap should have valid Luis Authoring Regions", async () => {
        for (let targetRegion of Object.values(utils.regionToLuisAuthoringRegionMap)) {
            assert.ok(utils.luisAuthoringRegions.find(r => r == targetRegion), `${targetRegion} is not a valid region code for luis Authoring Region`);
        }
    });

    it("regionToLuisPublishRegionMap should have valid Luis Publish Regions", async () => {
        for (let targetRegion of Object.values(utils.regionToLuisPublishRegionMap)) {
            assert.ok(utils.luisPublishRegions.find(r => r == targetRegion), `${targetRegion} is not a valid region code for luis Publishing Region`);
        }
    });

    it("regionToSearchRegionMap should have valid Azure Search Regions", async () => {
        for (let targetRegion of Object.values(utils.regionToSearchRegionMap)) {
            assert.ok(utils.searchRegions.find(r => r == targetRegion), `${targetRegion} is not a valid region code for azure search Region`);
        }
    });

});
