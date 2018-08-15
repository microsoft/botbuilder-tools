/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const parser = require('../lib/parseFileContents');
describe('Roles in LU files', function() {
    it('Corretly parses simple roles in LU files', function(done){
        let fileContent = `# getUserName
        - call me {name:userName}`;
        parser.parseFile(fileContent, false, null)
            .then(res => {
                assert.equal(res.LUISJsonStructure.patternAnyEntities[0].name, 'name');
                assert.deepEqual(res.LUISJsonStructure.patternAnyEntities[0].roles, ['userName']);
                done();
            })
            .catch(err => done(err));
    });

    it('Correctly parses roles with explict type definition in LU files', function(done) {
        let fileContent = `# getUserName
        - call me {name:userName}
        
        $name: simple`;
        parser.parseFile(fileContent, false, null)
        .then(res => {
            assert.equal(res.LUISJsonStructure.entities[0].name, 'name');
            assert.deepEqual(res.LUISJsonStructure.entities[0].roles, ['userName']);
            done();
        })
        .catch(err => done(err));
    });

    it('Correctly parses multiple role definitions in LU files correctly', function(done) {
        let fileContent = `> You can use roles in patterns using the entityName:role notation.
        # getUserName
        - call me {name:userName}
        - I'm {name:userName}
        - my name is {name:userName}
        
        # getUserFirstName
        > this is another role for the same 'name' entity
        - [[my] first name is] {name:userFirstName}
        
        # BookFlight
        > roles can be specified for list entity types as well - in this case fromCity and toCity are added as roles to the 'city' list entity defined further below
        - book flight from {city:fromCity} to {city:toCity}
        - [can you] get me a flight from {city:fromCity} to {city:toCity}
        - get me a flight to {city:toCity}
        - I need to fly from {city:fromCity}
        
        $city:Seattle=
        - Seattle
        - Tacoma
        - SeaTac
        - SEA
        
        $city:Portland=
        - Portland
        - PDX
        
        # setAlarm
        > prebuilt entitities can have roles as well.
        - create alarm for {datetimeV2:startTime}
        
        # deleteAlarm
        - remove the {datetimeV2:deleteTime} alarm
        
        > This is just defining datetimeV2 as a prebuilt entity type. If an explicit type is not specified, by default entities in patterns will be set to pattern.any entity type
        $PREBUILT:datetimeV2
        
        # randomTestIntent
        - test {entity:foo}
        
        $entity: simple

        `;
        parser.parseFile(fileContent, false, null)
        .then(res => {
            assert.equal(res.LUISJsonStructure.entities[0].name, 'entity');
            assert.deepEqual(res.LUISJsonStructure.entities[0].roles, ['foo']);
            assert.equal(res.LUISJsonStructure.patternAnyEntities[0].name, 'name');
            assert.deepEqual(res.LUISJsonStructure.patternAnyEntities[0].roles, ['userName', 'userFirstName']);
            assert.equal(res.LUISJsonStructure.prebuiltEntities[0].name, 'datetimeV2');
            assert.deepEqual(res.LUISJsonStructure.prebuiltEntities[0].roles, ['startTime', 'deleteTime']);
            done();
        })
        .catch(err => done(err));
    });
});