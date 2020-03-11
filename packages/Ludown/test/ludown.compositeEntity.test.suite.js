/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const chai = require('chai');
const assert = chai.assert;
const parseFile = require('../lib/parseFileContents').parseFile;
const hClasses = require('../lib/classes/hclasses');
const collateLUISFiles = require('../lib/parseFileContents').collateLUISFiles;
const LUFromLUISJson = require('../lib/toLU-helpers').constructMdFromLUISJSON;
const NEWLINE = require('os').EOL;
const validateLUISModel = require('../lib/parseFileContents').validateLUISBlob;
function sanitizeContent(fileContent) {
    let escapedExampleNewLine = JSON.stringify('\r\n').replace(/"/g, '').replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    let escapedNewLine = JSON.stringify(NEWLINE).replace(/"/g, '');
    return fileContent.replace(new RegExp(escapedExampleNewLine, 'g'), escapedNewLine);
}
describe('Composite entities in .lu files', function() {
    it('Parser throws an excption on invalid composite entity definition - incorrect square brackets', function(done){
        let luFileContent = `$deviceTemperature : [`;
        parseFile(luFileContent, false)
            .then(res => done(`Test fail! Did not throw when expected`))
            .catch(err => done())
    });

    it('Parser throws an excption when no children defined for a composite entity', function(done){
        let luFileContent = `$deviceTemperature : []`;
        parseFile(luFileContent, false)
            .then(res => done(`Test fail! Did not throw when expected`))
            .catch(err => done())
    });

    it('Parser throws an excption when multiple composite entity definitions with inconsistent children are found', function(done){
        let luFileContent = `$deviceTemperature : [bar]
$deviceTemperature : [foo]`;
        parseFile(luFileContent, false)
            .then(res => done(`Test fail! Did not throw when expected`))
            .catch(err => done())
    });

    it('Parser correctly parses composite entity definition with comma delimiter', function(done){
        let luFileContent = `$deviceTemperature : [child1, child2]`;
        let testCompositeEntity = new hClasses.compositeEntity('deviceTemperature', ['child1', 'child2']);
        parseFile(luFileContent, false)
            .then(res => {
                assert.deepEqual(res.LUISJsonStructure.composites[0], testCompositeEntity);
                done();
            })
            .catch(err => done(`Test failed - ${err}`))
    });

    it('Parser correctly parses composite entity definition with semicolon delimiter', function(done){
        let luFileContent = `$deviceTemperature : [child1; child2]`;
        let testCompositeEntity = new hClasses.compositeEntity('deviceTemperature', ['child1', 'child2']);
        parseFile(luFileContent, false)
            .then(res => {
                assert.deepEqual(res.LUISJsonStructure.composites[0], testCompositeEntity);
                done();
            })
            .catch(err => done(`Test failed - ${err}`))
    });

    it('Parser throws when a composite entity has a pattern.any entity as a child', function(done){
        let luFileContent = `$deviceTemperature : [p1; child2]
# testIntent
- I'm {p1}`;
        parseFile(luFileContent, false)
            .then(res => {
                validateLUISModel(res.LUISJsonStructure)
                    .then(res => done(`Test fail! Did not throw when expected`))
                    .catch(err => done())
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it('Parser throws when a composite entity name collides with another entity name', function(done){
        let luFileContent = `$deviceTemperature : [p1; child2]
$deviceTemperature:simple`;
        parseFile(luFileContent, false)
            .then(res => {
                validateLUISModel(res.LUISJsonStructure)
                    .then(res => done(`Test fail! Did not throw when expected`))
                    .catch(err => done())
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it('Parser throws when a composite entity includes a child without an explicit child entity definition', function(done){
        let luFileContent = `$deviceTemperature : [p1; child2]`;
        parseFile(luFileContent, false)
            .then(res => {
                validateLUISModel(res.LUISJsonStructure)
                    .then(res => done(`Test fail! Did not throw when expected`))
                    .catch(err => done())
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it('Parser throws and correctly identifies a child without an explicit or implicit child entity definition', function(done){
        let luFileContent = `$deviceTemperature : [p1; child2]
# test
- this is a test with {p1=vishwac}`;
        parseFile(luFileContent, false)
            .then(res => {
                validateLUISModel(res.LUISJsonStructure)
                    .then(res => done(`Test fail! Did not throw when expected`))
                    .catch(err => done())
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it('Parser throws when a composite entity has different definition across two different .lu file', function(done){
        let luFile1Content = `$deviceTemperature : [child1; child2]`;
        let luFile2Content = `$deviceTemperature : [child3]`;
        parseFile(luFile1Content, false)
            .then(res1 => {
                parseFile(luFile2Content, false) 
                    .then(res2 => {
                        collateLUISFiles([res1, res2])
                            .then(res => done(`Test fail! Did not throw when expected`))
                            .catch(err => done())
                    })
                    .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it('Parser throws and correctly identifies a child without an explicit or implicit child entity definition [across .lu files]', function(done){
        let luFile1Content = `$deviceTemperature : [p1; child2]`;
        let luFile2Content = `# test
        - this is a test with {p1=vishwac}`;
        parseFile(luFile1Content, false)
            .then(res1 => {
                parseFile(luFile2Content, false) 
                    .then(res2 => {
                        collateLUISFiles([res1, res2])
                            .then(res3 => {
                                validateLUISModel(res3)
                                    .then(res => done(`Test fail! Did not throw when expected`))
                                    .catch(err => done())
                            })
                            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
                    })
                    .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it('Parser correctly collates composite child entity type definition [across .lu files]', function(done){
        let luFile1Content = `$deviceTemperature : [p1; child2]`;
        let luFile2Content = `# test
        - this is a test with {p1=vishwac}
        $child2:foo=
            - bar`;
        parseFile(luFile1Content, false)
            .then(res1 => {
                parseFile(luFile2Content, false) 
                    .then(res2 => {
                        collateLUISFiles([res1, res2])
                            .then(res3 => {
                                validateLUISModel(res3)
                                    .then(res => done())
                                    .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
                            })
                            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
                    })
                    .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it('Refresh correctly generates LU file content for composite entities', function(done){
        let inputLUISJSON = `{
            "intents": [],
            "entities": [
              {
                "name": "p1",
                "roles": []
              },
              {
                "name": "child2",
                "roles": []
              }
            ],
            "composites": [
              {
                "name": "deviceTemperature",
                "children": [
                  "p1",
                  "child2"
                ],
                "roles": []
              }
            ],
            "closedLists": [],
            "regex_entities": [],
            "model_features": [],
            "regex_features": [],
            "utterances": [],
            "patterns": [],
            "patternAnyEntities": [],
            "prebuiltEntities": [],
            "luis_schema_version": "3.2.0",
            "versionId": "0.1",
            "name": "compositeEntities",
            "desc": "",
            "culture": "en-us"
          }`
          LUFromLUISJson(JSON.parse(inputLUISJSON))
            .then(res => {
                assert(res.includes(`$deviceTemperature:[p1, child2]`));
                done();
            })
            .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    })

    it('Utterances with composite entity labels are handled correctly with ludown refresh', function(done) {
        let inputLUISJSON = `{
            "luis_schema_version": "3.2.0",
            "versionId": "0.1",
            "name": "composites",
            "desc": "",
            "culture": "en-us",
            "tokenizerVersion": "1.0.0",
            "intents": [
              {
                "name": "None"
              },
              {
                "name": "test"
              }
            ],
            "entities": [
              {
                "name": "simple1",
                "roles": []
              }
            ],
            "composites": [
              {
                "name": "c1",
                "children": [
                  "number",
                  "temperature",
                  "simple1"
                ],
                "roles": []
              }
            ],
            "closedLists": [],
            "patternAnyEntities": [],
            "regex_entities": [],
            "prebuiltEntities": [
              {
                "name": "number",
                "roles": []
              },
              {
                "name": "temperature",
                "roles": []
              }
            ],
            "model_features": [],
            "regex_features": [],
            "patterns": [],
            "utterances": [
              {
                "text": "this is a test",
                "intent": "test",
                "entities": []
              },
              {
                "text": "this is another test",
                "intent": "test",
                "entities": [
                  {
                    "entity": "simple1",
                    "startPos": 16,
                    "endPos": 19
                  },
                  {
                    "entity": "c1",
                    "startPos": 16,
                    "endPos": 19
                  }
                ]
              },
              {
                "text": "this is five degrees",
                "intent": "test",
                "entities": [
                  {
                    "entity": "c1",
                    "startPos": 8,
                    "endPos": 19
                  }
                ]
              },
              {
                "text": "this is one",
                "intent": "test",
                "entities": [
                  {
                    "entity": "c1",
                    "startPos": 0,
                    "endPos": 10
                  }
                ]
              },
              {
                "text": "this is one and five degrees",
                "intent": "test",
                "entities": [
                  {
                    "entity": "c1",
                    "startPos": 8,
                    "endPos": 27
                  },
                  {
                    "entity": "simple1",
                    "startPos": 12,
                    "endPos": 14
                  }
                ]
              }
            ],
            "settings": []
          }`;
      LUFromLUISJson(JSON.parse(inputLUISJSON))
          .then(res => {
              assert(res.includes(`- this is another {c1={simple1=test}}`));
              assert(res.includes(`- this is {c1=five degrees}`));
              assert(res.includes(`- this is {c1=one {simple1=and} five degrees}`));
              assert(res.includes(`- {c1=this is one}`));
              done();
          })
          .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    })

    it ('composite entities defined in an utterance is parsed correctly', function(done){
      let testLUFile = `
      $device : thermostat=
          - Thermostat
          - Heater
          - AC
          - Air conditioner
      
      $device : refrigerator=
          - Fridge
          - Cooler
      
      $customDevice : simple
      
      $PREBUILT : temperature
      
      $deviceTemperature: [device, customDevice, temperature]
      
      # setThermostat
          - Please set {deviceTemperature = thermostat to 72}
          - Set {deviceTemperature = {customDevice = owen} to 72}`;

      parseFile(testLUFile, false)
        .then(res => {
          assert.equal(res.LUISJsonStructure.entities.length, 1);
          assert.equal(res.LUISJsonStructure.composites.length, 1);
          assert.equal(res.LUISJsonStructure.composites[0].name, 'deviceTemperature');
          assert.deepEqual(res.LUISJsonStructure.composites[0].children, ['device', 'customDevice', 'temperature']);
          assert.equal(res.LUISJsonStructure.utterances.length, 2);
          assert.equal(res.LUISJsonStructure.utterances[1].text, 'Set owen to 72');
          assert.equal(res.LUISJsonStructure.utterances[1].entities.length, 2);
          done();
        })
        .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    }) 

    it ('composite entities defined in an utterance is parsed correctly (composite definition after reference to composite in utterance)', function(done){
      let testLUFile = `
      $device : thermostat=
          - Thermostat
          - Heater
          - AC
          - Air conditioner
      
      $device : refrigerator=
          - Fridge
          - Cooler
      
      $customDevice : simple
      $PREBUILT : temperature

      # setThermostat
          - Please set {deviceTemperature = thermostat to 72}
          - Set {deviceTemperature = {customDevice = owen} to 72}
      
      $deviceTemperature: [device, customDevice, temperature]`;

      parseFile(testLUFile, false)
        .then(res => {
          assert.equal(res.LUISJsonStructure.entities.length, 1);
          assert.equal(res.LUISJsonStructure.composites.length, 1);
          assert.equal(res.LUISJsonStructure.composites[0].name, 'deviceTemperature');
          assert.deepEqual(res.LUISJsonStructure.composites[0].children, ['device', 'customDevice', 'temperature']);
          assert.equal(res.LUISJsonStructure.utterances.length, 2);
          assert.equal(res.LUISJsonStructure.utterances[1].text, 'Set owen to 72');
          assert.equal(res.LUISJsonStructure.utterances[1].entities.length, 2);
          done();
        })
        .catch(err => done(`Test failed - ${JSON.stringify(err)}`))
    });

    it ('composites cannot include pattern.any entity', function(done) {
      let luFile = `# Test
      - {p = {q}}`;
      parseFile(luFile, false)
        .then(res => done(`Test failed - did not throw when expected. ${res}`))
        .catch(err => done())
    });
    
    it ('Correctly parses composites with text in between labels', function(done){
      let luFile = `# Test
      - zero {foo = one {one = two} three} four
      
      $ foo : [one]`;
      parseFile(luFile, false) 
        .then(res => {
          assert.equal(res.LUISJsonStructure.composites.length, 1);
          assert.equal(res.LUISJsonStructure.utterances.length, 1);
          assert.equal(res.LUISJsonStructure.utterances[0].text, "zero one two three four");
          assert.equal(res.LUISJsonStructure.utterances[0].entities.length, 2);
          assert.equal(res.LUISJsonStructure.utterances[0].entities[0].startPos, 9);
          assert.equal(res.LUISJsonStructure.utterances[0].entities[0].endPos, 11);
          assert.equal(res.LUISJsonStructure.utterances[0].entities[1].startPos, 5);
          assert.equal(res.LUISJsonStructure.utterances[0].entities[1].endPos, 17);
          done();
        })
        .catch(err => done(err))
    })
});