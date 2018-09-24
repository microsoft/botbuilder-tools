const path = require('path');
const assert = require('assert');
const {exec, spawn} = require('child_process');

const mslg = path.resolve('../bin/mslg');

describe('The MSLG CLI Model Operations', () => {

     describe('Create Model', function() {

         it('should print the help contents when model --help is used', function(done) {
             exec(`node ${mslg} create model --help`, (error, stdout) => {
                 assert(stdout.includes('Creates a new language generation model.'), stdout);
                 assert(stdout.includes('mslg create model --lg <string> --in modelDefinition.json'), stdout);
                 done();
             });
         });


         it('should fail as no lg file or folder provided', function(done) {
             exec(`node ${mslg} create model --in TestData/definitions/modelDefinition.json --mock`, (error, stdout, stderr) => {
                assert(stderr.includes("No .lg file or folder specified."));
                done();
             });
         });

         it('should parse and collate files in folder and then create model as defined in definition file', function(done) {
            exec(`node ${mslg} create model --lgFolder TestData/examples/LGAB --in TestData/definitions/modelDefinitionWithoutText.json --mock`, (error, stdout, stderr) => {
                assert(stdout.includes('Operation Succeeded'), stdout);
                assert.notEqual(JSON.parse(stdout.replace("Operation Succeeded", "")), null);
                done();
            });
        });

        it('should parse file and then create model as defined in .lgrc', function(done) {
            exec(`node ${mslg} create model --lg TestData/examples/LGFileC.lg --mock`, (error, stdout, stderr) => {
                assert(stdout.includes('Operation Succeeded'), stdout);
                assert.notEqual(JSON.parse(stdout.replace("Operation Succeeded", "")), null);
                done();
            });
        });

     });

    describe('Get Models', function() {

        it('should print the help contents when model --help is used', function(done) {
            exec(`node ${mslg} get models --help`, (error, stdout) => {
                assert(stdout.includes('Gets all language generation model of a subscription.'), stdout);
                assert(stdout.includes('mslg get models'), stdout);
                done();
            });
        });

       it('should get model with specific id', function(done) {
           exec(`node ${mslg} get models --authoringKey dummy-key --mock`, (error, stdout) => {
                assert(stdout.includes('Operation Succeeded'), stdout);
                let result = JSON.parse(stdout.replace("Operation Succeeded", ""));
                assert.notEqual(result, null);
                assert.equal(result.length, 1);
                assert.equal(result[0].id, "7e7b515e-5dd9-42df-921d-6a515af9fab8");
                done();
           });
       });    

   });

    describe('Get Model', function() {

         it('should print the help contents when model --help is used', function(done) {
             exec(`node ${mslg} get model --help`, (error, stdout) => {
                 assert(stdout.includes('Gets the specified language generation model.'), stdout);
                 assert(stdout.includes('mslg get model --id <string>'), stdout);
                 done();
             });
         });

        it('should get model with specific id', function(done) {
            exec(`node ${mslg} get model --id adb25dab-22a8-44d1-88db-3eac2290bb44 --mock`, (error, stdout) => {
                assert(stdout.includes('Operation Succeeded'), stdout);
                let result = JSON.parse(stdout.replace("Operation Succeeded", ""));
                assert.notEqual(result, null);
                assert.equal(result.locale, "en-US");
                assert.equal(result.name, "CafeBot model");
                assert.equal(result.modelKind, "LanguageGeneration");
                assert.equal(result.id, "adb25dab-22a8-44d1-88db-3eac2290bb44");
                done();
            });
        });    

    });

    describe('Delete Model', function() {

        it('should print the help contents when model --help is used', function(done) {
            exec(`node ${mslg} delete model --help`, (error, stdout) => {
                assert(stdout.includes('Deletes the language generation model with the given id.'), stdout);
                assert(stdout.includes('mslg delete model --id <string>'), stdout);
                done();
            });
        });

       
       it('should prompt the user to delete the model first, then proceed with deletion', async () => {
            const mslgProcess = spawn('node', [mslg, 'delete', 'model', '--id', '31f0f91b', '--mock'], {stdio: ['pipe', 'pipe', process.stderr]});
            let msgCt = 0;
            await new Promise(resolve => {
                mslgProcess.stdout.on('data', data => {
                    const message = (msgCt++, data.toString());
                    switch (msgCt) {
                    case 1:
                        assert(message.includes('Are you sure you would like to delete model with id 31f0f91b'));
                        mslgProcess.stdin.write('yes\r');
                        break;
                    case 2:
                        assert(message.includes('Operation Succeeded'), message);
                        resolve();
                        break;
                    }
                });
            });
        });

   });

   describe('Update Model', function() {

        it('should print the help contents when model --help is used', function(done) {
            exec(`node ${mslg} update model --help`, (error, stdout) => {
                assert(stdout.includes('Updates the mutable details of the language generation model identified by its id.'), stdout);
                assert(stdout.includes('mslg update model --in modelUpdate.json --id <string>'), stdout);
                done();
            });
        });

        it('should fail and print the help contents when update model is used without definition file', function(done) {
            exec(`node ${mslg} update model`, (error, stdout) => {
                assert.equal(stdout, '');
                assert(error.message.includes('The updateModel requires an input of type: ModelUpdate'), error.message);
                done();
            });
        });

        it('should update model', function(done) {
            exec(`node ${mslg} update model --in TestData/definitions/modelUpdate.json --id 87916f84-61cf-4f6f-a454-1228e4041ce9 --mock`, (error, stdout) => {
                assert(stdout.includes('Operation Succeeded'), stdout);
                let result = JSON.parse(stdout.replace("Operation Succeeded", ""));
                assert.notEqual(result, null);
                assert.equal(result.id, "87916f84-61cf-4f6f-a454-1228e4041ce9");
                done();
            });
        });
   
    });

});