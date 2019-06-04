/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const parser = require('../lib/parseFileContents');
const toLU = require('../lib/toLU-helpers').constructMdFromLUISJSON;
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

    it('colon usage in utterance text outside of roles is parsed correctly', function (done) {
        let fileContent = `# testIntent
        - this is a : test intent {userName=vishwac}`;
        parser.parseFile(fileContent, false, null) 
            .then(res => {
                assert.equal(res.LUISJsonStructure.entities[0].name, 'userName');
                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                assert.equal(res.LUISJsonStructure.utterances[0].text, "this is a : test intent vishwac");
                done();
            })
            .catch(err => done(err));
    });

    it('equal usage in utterance text outside of roles is parsed correctly', function (done) {
        let fileContent = `# testIntent
        - this is a = test intent {userName=vishwac}`;
        parser.parseFile(fileContent, false, null) 
            .then(res => {
                assert.equal(res.LUISJsonStructure.entities[0].name, 'userName');
                assert.equal(res.LUISJsonStructure.utterances.length, 1);
                assert.equal(res.LUISJsonStructure.utterances[0].text, "this is a = test intent vishwac");
                done();
            })
            .catch(err => done(err));
    })
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

    it ('prebuilt entities cannot be explicitly labelled in utterances', function(done){
        let testLU = `
        $PREBUILT:datetimeV2
        
        # testIntent
        - set alartm at {datetimeV2=7AM}`;

        parser.parseFile(testLU, false, null) 
            .then (res => done (`Test failed - ${JSON.stringify(res)}`))
            .catch (err => done())
    }); 

    it ('List entities cannot be explicitly labelled in utterances', function(done){
        let testLU = `
        $location:redmond=
        - redmond
        
        # testIntent
        - book a flight to {location=redmond}`;

        parser.parseFile(testLU, false, null) 
            .then (res => done (`Test failed - ${JSON.stringify(res)}`))
            .catch (err => done())
    }); 

    

    it ('RegEx entities cannot be explicitly labelled in utterances', function(done){
        let testLU = `
        $HRF-number:/hrf-[0-9]{6}/
        
        # testIntent
        - book a flight to {HRF-number=redmond}`;

        parser.parseFile(testLU, false, null) 
            .then (res => done (`Test failed - ${JSON.stringify(res)}`))
            .catch (err => done())
    }); 

    it ('composite entity with role definition in labelled utterances is parsed correctly', function(done){
        let testLU = `
        $flightBooking : [From, To]
        $From:simple
        $To:simple
        
        # test
        - book a flight {flightBooking:fromCity={From=london}}`;
        parser.parseFile(testLU, false, null) 
            .then (res => {
                let LUISJSon = res.LUISJsonStructure;
                assert(LUISJSon.entities.length, 2);
                assert(LUISJSon.composites.length, 1);
                assert(LUISJSon.composites[0].roles.length, 1);
                assert(LUISJSon.utterances.length, 1);
                assert(LUISJSon.utterances[0].entities[1].role, 'fromCity');
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it ('labelled simple entities in uttearnces with role definition are parsed correcly', function(done){
        let testLU = `
        # test
        - this is a {test:role1=test} utterance`;

        parser.parseFile(testLU, false, null)
            .then (res => {
                let LUISJson = res.LUISJsonStructure;
                assert(LUISJson.entities[0].name, 'test');
                assert(LUISJson.entities[0].roles[0], 'test');
                assert(LUISJson.utterances[0].text, 'this is a test utterance');
                assert(LUISJson.utterances[0].entities[0].role, 'test');
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it ('explicit phrase list entity type definition after adding it implicitly via a labelled value in an utterance throws correctly', function(done){
        let testLU = `# test
        - this is a test of {test:fromTime = 7AM}
        
        $test:phraseList
- m&m,mars,mints,spearmings,payday,jelly,kit kat,kitkat,twix`;

        parser.parseFile(testLU, false, null)
            .then (res => done(`Test failed - ${JSON.stringify(res)}`))
            .catch (err => done ())
    })

    it ('explicit composite entity type definition after adding it implicitly via a labelled value in an utterance is parsed correctly', function(done){
        let testLU = `# test
        - this is a test of {test:role1 = {fromTime = 7AM}}
        
$test:[fromTime]`;

        parser.parseFile(testLU, false, null)
            .then (res => {
                let LUISJson = res.LUISJsonStructure;
                assert(LUISJson.composites.length, 1);
                assert(LUISJson.composites[0].roles.length, 1);
                assert(LUISJson.composites[0].roles[0], 'role1');
                assert(LUISJson.entities.length, 1);
                assert(LUISJson.utterances.length, 1);
                assert(LUISJson.utterances[0].entities.length, 2);
                assert(LUISJson.utterances[0].entities[1].role, 'role1');
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it ('simple entity definitions with roles are parsed correctly', function(done) {
        let testLU = `$name:simple roles=[firstname, lastname]
        `;

        parser.parseFile(testLU, false, null)
            .then (res => {
                let LUISJSon = res.LUISJsonStructure;
                assert(LUISJSon.entities.length, 1);
                assert(LUISJSon.entities[0].roles, 2);
                assert.deepEqual(LUISJSon.entities[0].roles, ['firstname', 'lastname']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))
    })

    it ('simple entity definitions with roles are collated correctly', function(done) {
        let testLU = `$name:simple roles=[firstname, lastname]
        
        # test 
        - my middle name is {name:middlename=sena}`;

        parser.parseFile(testLU, false, null)
            .then (res => {
                let LUISJSon = res.LUISJsonStructure;
                assert(LUISJSon.entities.length, 1);
                assert(LUISJSon.entities[0].roles, 3);
                assert.deepEqual(LUISJSon.entities[0].roles, ['firstname', 'lastname', 'middlename']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))
    })

    it ('simple entity definitions with roles are collated correctly', function(done) {
        let testLU = `
        
        # test 
        - my middle name is {name:middlename=sena}
        
        $name:simple roles=[firstname, lastname]`;

        parser.parseFile(testLU, false, null)
            .then (res => {
                let LUISJSon = res.LUISJsonStructure;
                assert(LUISJSon.entities.length, 1);
                assert(LUISJSon.entities[0].roles, 3);
                assert.deepEqual(LUISJSon.entities[0].roles, ['middlename', 'firstname', 'lastname']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))
    })

    it ('prebuilt entity definitions with roles are parsed correctly', function(done) {
        let testLU = `$PREBUILT:datetimeV2 roles=[fromDate, toDate]
        `;

        parser.parseFile(testLU, false, null)
            .then (res => {
                let LUISJSon = res.LUISJsonStructure;
                assert(LUISJSon.prebuiltEntities.length, 1);
                assert(LUISJSon.prebuiltEntities[0].roles, 2);
                assert.deepEqual(LUISJSon.prebuiltEntities[0].roles, ['fromDate', 'toDate']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))
    })

    it ('pre-built entity definitions with roles are collated correctly', function(done) {
        let testLU = `$PREBUILT:datetimeV2 roles=[fromDate, toDate]
        
        # test 
        - my first name is vishwac
        
        $PREBUILT:datetimeV2 roles=[tempDate]`;

        parser.parseFile(testLU, false, null)
            .then (res => {
                let LUISJSon = res.LUISJsonStructure;
                assert(LUISJSon.prebuiltEntities.length, 1);
                assert(LUISJSon.prebuiltEntities[0].roles, 3);
                assert.deepEqual(LUISJSon.prebuiltEntities[0].roles, ['fromDate', 'toDate', 'tempDate']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))
    })

    it ('simple entity definitions with roles are collated correctly', function(done) {
        let testLU = `$PREBUILT:datetimeV2 roles=[fromDate, toDate]
        
        # test 
        - my first name is vishwac
        
        $PREBUILT:number roles=[start, end]`;

        parser.parseFile(testLU, false, null)
            .then (res => {
                let LUISJSon = res.LUISJsonStructure;
                assert(LUISJSon.prebuiltEntities.length, 2);
                assert(LUISJSon.prebuiltEntities[0].roles, 2);
                assert.deepEqual(LUISJSon.prebuiltEntities[0].roles, ['fromDate', 'toDate']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it ('List entities with explicit role definitions are parsed correctly', function(done) {
        let testLU = `
        $location:seattle= roles=[fromCity,toCity]
            - seattle`;
        
        parser.parseFile(testLU, false, null)
            .then(res => {
                let LUISJson = res.LUISJsonStructure;
                assert(LUISJson.closedLists.length, 1);
                assert(LUISJson.closedLists[0].subLists.length, 1);
                assert(LUISJson.closedLists[0].subLists[0].canonicalForm, 'seattle');
                assert.deepEqual(LUISJson.closedLists[0].subLists[0].list, ['seattle']);
                assert(LUISJson.closedLists[0].roles.length, 2);
                assert.deepEqual(LUISJson.closedLists[0].roles, ['fromCity', 'toCity']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))

    })

    it ('List entities with explicit role definitions are collated correctly', function(done) {
        let testLU = `
        $location:seattle= roles=[fromCity]
            - seattle
        
        # test
        - test intent
        
        $location:new york= roles=[toCity]`;
        
        parser.parseFile(testLU, false, null)
            .then(res => {
                let LUISJson = res.LUISJsonStructure;
                assert(LUISJson.closedLists.length, 1);
                assert(LUISJson.closedLists[0].subLists.length, 2);
                assert(LUISJson.closedLists[0].subLists[0].canonicalForm, 'seattle');
                assert.deepEqual(LUISJson.closedLists[0].subLists[0].list, ['seattle']);
                assert(LUISJson.closedLists[0].roles.length, 2);
                assert.deepEqual(LUISJson.closedLists[0].roles, ['fromCity', 'toCity']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))

    });

    it ('RegEx entities with explicit role definitions are parsed correctly', function(done) {
        let testLU = `$HRF-number:/hrf-[0-9]{6}/ roles=fromNumber,toNumber`;
        
        parser.parseFile(testLU, false, null)
            .then(res => {
                let LUISJson = res.LUISJsonStructure;
                assert(LUISJson.regex_entities.length, 1);
                assert(LUISJson.regex_entities[0].name, 'HRF-number');
                assert(LUISJson.regex_entities[0].roles.length, 2);
                assert.deepEqual(LUISJson.regex_entities[0].roles, ['fromNumber', 'toNumber']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))

    });

    it ('RegEx entities with explicit role definitions are collated correctly', function(done) {
        let testLU = `$HRF-number:/hrf-[0-9]{6}/ roles=fromNumber
        $HRF-number:/hrf-[0-9]{6}/ roles=toNumber`;
        
        parser.parseFile(testLU, false, null)
            .then(res => {
                let LUISJson = res.LUISJsonStructure;
                assert(LUISJson.regex_entities.length, 1);
                assert(LUISJson.regex_entities[0].name, 'HRF-number');
                assert(LUISJson.regex_entities[0].roles.length, 2);
                assert.deepEqual(LUISJson.regex_entities[0].roles, ['fromNumber', 'toNumber']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))

    })

    it ('composite entities with explicit role definition are parsed correctly', function(done) {
        let testLU = `$temperatureUnit : [device, temperature] roles=from, to
        $device : simple
        $PREBUILT : temperature`;

        parser.parseFile(testLU, false, null) 
            .then (res => {
                let LUISJSon = res.LUISJsonStructure;
                assert(LUISJSon.composites.length, 1);
                assert(LUISJSon.composites[0].roles.length, 2);
                assert.deepEqual(LUISJSon.composites[0].roles, ['from', 'to']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))

    })

    it ('composite entities with explicit role definition are collated correctly', function(done) {
        let testLU = `$temperatureUnit : [device, temperature] roles=from
        $device : simple
        $PREBUILT : temperature
        $temperatureUnit : [device, temperature] roles=to`;

        parser.parseFile(testLU, false, null) 
            .then (res => {
                let LUISJSon = res.LUISJsonStructure;
                assert(LUISJSon.composites.length, 1);
                assert(LUISJSon.composites[0].roles.length, 2);
                assert.deepEqual(LUISJSon.composites[0].roles, ['from', 'to']);
                done();
            })
            .catch (err => done(`Test failed - ${JSON.stringify(err)}`))

    })

    it ('parser correctly throws for Pharse lists with explicit role definition', function(done) {
        let testLU = `$Want:PhraseList roles=[foo,bar]
        - require, need, desire, know`;

        parser.parseFile(testLU, false, null) 
            .then (res => done(`Test failed. Did not throw when expected- ${JSON.stringify(err)}`))
            .catch (err => done())
    });

    it ('Roles for simple entities defined across lu files are collated correctly', function(done) {
        let testLU1 = `$userName:simple role=firstName`;
        let testLU2 = `$userName:simple role=lastName`;

        parser.parseFile(testLU1, false)
            .then(res1 => {
                parser.parseFile(testLU2, false) 
                    .then(res2 => {
                        parser.collateLUISFiles([res1, res2])
                            .then(res => {
                                assert(res.entities.length, 1);
                                assert(res.entities[0].roles.length, 2);
                                assert.deepEqual(res.entities[0].roles, ['firstName', 'lastName']);
                                done();
                            })
                            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
                    })
                    .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    })

    it ('Roles for prebuilt entities defined across lu files are collated correctly', function(done) {
        let testLU1 = `$PREBUILT:datetimeV2 role=fromDate`;
        let testLU2 = `$PREBUILT:datetimeV2 role=toDate`;

        parser.parseFile(testLU1, false)
            .then(res1 => {
                parser.parseFile(testLU2, false) 
                    .then(res2 => {
                        parser.collateLUISFiles([res1, res2])
                            .then(res => {
                                assert(res.prebuiltEntities.length, 1);
                                assert(res.prebuiltEntities[0].roles.length, 2);
                                assert.deepEqual(res.prebuiltEntities[0].roles, ['fromDate', 'toDate']);
                                done();
                            })
                            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
                    })
                    .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    })

    it ('Roles for list entities defined across lu files are collated correctly', function(done) {
        let testLU1 = `$location:seattle= role=fromCity
        - seattle`;
        let testLU2 = `$location:new york= role=toCity
        - new york`;

        parser.parseFile(testLU1, false)
            .then(res1 => {
                parser.parseFile(testLU2, false) 
                    .then(res2 => {
                        parser.collateLUISFiles([res1, res2])
                            .then(res => {
                                assert(res.closedLists.length, 1);
                                assert(res.closedLists[0].roles.length, 2);
                                assert.deepEqual(res.closedLists[0].roles, ['fromCity', 'toCity']);
                                done();
                            })
                            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
                    })
                    .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    })


    it ('Roles for regex entities defined across lu files are collated correctly', function(done) {
        let testLU1 = `$HRF-number:/hrf-[0-9]{6}/ roles=fromNumber`;
        let testLU2 = `$HRF-number:/hrf-[0-9]{6}/ roles=toNumber`;

        parser.parseFile(testLU1, false)
            .then(res1 => {
                parser.parseFile(testLU2, false) 
                    .then(res2 => {
                        parser.collateLUISFiles([res1, res2])
                            .then(res => {
                                assert(res.regex_entities.length, 1);
                                assert(res.regex_entities[0].roles.length, 2);
                                assert.deepEqual(res.regex_entities[0].roles, ['fromNumber', 'toNumber']);
                                done();
                            })
                            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
                    })
                    .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    })
    
    it ('Roles for composite entities defined across lu files are collated correctly', function(done) {
        let testLU1 = `$temperatureUnit : [device, temperature] roles=from`;
        let testLU2 = `$temperatureUnit : [device, temperature] roles=to`;

        parser.parseFile(testLU1, false)
            .then(res1 => {
                parser.parseFile(testLU2, false) 
                    .then(res2 => {
                        parser.collateLUISFiles([res1, res2])
                            .then(res => {
                                assert(res.composites.length, 1);
                                assert(res.composites[0].roles.length, 2);
                                assert.deepEqual(res.composites[0].roles, ['from', 'to']);
                                done();
                            })
                            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
                    })
                    .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    })

    it ('Roles for Pattern.Any entities defined across lu files are collated correctly', function(done) {
        let testLU1 = `# test
        - set alarm for {time:fromTime}`;
        let testLU2 = `# test
        - set alarm for {time:toTime}`;

        parser.parseFile(testLU1, false)
            .then(res1 => {
                parser.parseFile(testLU2, false) 
                    .then(res2 => {
                        parser.collateLUISFiles([res1, res2])
                            .then(res => {
                                assert(res.patternAnyEntities.length, 1);
                                assert(res.patternAnyEntities[0].roles.length, 2);
                                assert.deepEqual(res.patternAnyEntities[0].roles, ['fromTime', 'toTime']);
                                done();
                            })
                            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
                    })
                    .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it ('Ludown refresh successfully converts a luis model with role definition into a .lu file', function(done){
        let testModel = `{
            "intents": [
              {
                "name": "getName"
              },
              {
                "name": "BookFlight"
              }
            ],
            "entities": [
              {
                "name": "userName",
                "roles": [
                  "firstName"
                ]
              },
              {
                "name": "name",
                "roles": [
                  "lastName"
                ]
              }
            ],
            "composites": [
              {
                "name": "location",
                "children": [
                  "city"
                ],
                "roles": [
                  "fromCity",
                  "toCity"
                ]
              }
            ],
            "closedLists": [
              {
                "name": "city",
                "subLists": [
                  {
                    "canonicalForm": "seattle",
                    "list": [
                      "seattle",
                      "SEA",
                      "SeaTac"
                    ]
                  },
                  {
                    "canonicalForm": "new york",
                    "list": [
                      "new york",
                      "JFK",
                      "EWR"
                    ]
                  }
                ],
                "roles": []
              }
            ],
            "regex_entities": [],
            "model_features": [],
            "regex_features": [],
            "utterances": [
              {
                "text": "my name is vishwac",
                "intent": "getName",
                "entities": [
                  {
                    "entity": "userName",
                    "startPos": 11,
                    "endPos": 17,
                    "role": "firstName"
                  }
                ]
              },
              {
                "text": "my first name is vishwac",
                "intent": "getName",
                "entities": [
                  {
                    "entity": "userName",
                    "startPos": 17,
                    "endPos": 23,
                    "role": "firstName"
                  }
                ]
              },
              {
                "text": "my name is vishwac sena and last name is kannan",
                "intent": "getName",
                "entities": [
                  {
                    "entity": "userName",
                    "startPos": 11,
                    "endPos": 22,
                    "role": "firstName"
                  },
                  {
                    "entity": "name",
                    "startPos": 41,
                    "endPos": 46,
                    "role": "lastName"
                  }
                ]
              },
              {
                "text": "book a flight from seattle",
                "intent": "BookFlight",
                "entities": [
                  {
                    "entity": "location",
                    "startPos": 19,
                    "endPos": 25,
                    "role": "fromCity"
                  }
                ]
              },
              {
                "text": "book a flight to london",
                "intent": "BookFlight",
                "entities": [
                  {
                    "entity": "location",
                    "startPos": 17,
                    "endPos": 22,
                    "role": "toCity"
                  }
                ]
              }
            ],
            "patterns": [],
            "patternAnyEntities": [],
            "prebuiltEntities": [],
            "luis_schema_version": "3.0.0",
            "versionId": "0.1",
            "name": "1",
            "desc": "",
            "culture": "en-us"
          }`;
          toLU(JSON.parse(testModel))
            .then(res => {
                assert(res.includes(`- my name is {userName:firstName=vishwac}`));
                assert(res.includes(`- book a flight to {location:toCity=london}`));
                assert(res.includes(`$userName:simple Roles=firstName`));
                assert(res.includes(`$location:[city] Roles=fromCity, toCity`));
                done();
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))

    })

});