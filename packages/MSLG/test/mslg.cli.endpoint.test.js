const path = require('path');
const assert = require('assert');
const {exec, spawn} = require('child_process');

const mslg = path.resolve('../bin/mslg');

describe('The MSLG CLI Endpoint Operations', () => {

     describe('Create Endpoint', function() {

         it('should print the help contents when endpoint --help is used', function(done) {
             exec(`node ${mslg} create endpoint --help`, (error, stdout) => {
                 assert(stdout.includes('Creates a new language generation endpoint.'), stdout);
                 assert(stdout.includes('mslg create endpoint --in endpointDefinition.json'), stdout);
                 done();
             });
         });


         it('should create endpoint as defined in definition file', function(done) {
             exec(`node ${mslg} create endpoint --in TestData/definitions/endpointDefinition.json --mock`, (error, stdout, stderr) => {
                assert(stdout.includes('Operation Succeeded'), stdout);
                done();
             });
         });

     });

    describe('Get Endpoints', function() {

        it('should print the help contents when endpoints --help is used', function(done) {
            exec(`node ${mslg} get endpoints --help`, (error, stdout) => {
                assert(stdout.includes('Gets all language generation endpoint of a subscription.'), stdout);
                assert(stdout.includes('mslg get endpoints'), stdout);
                done();
            });
        });

       it('should get all lg endpoints of subscriptionKey', function(done) {
           exec(`node ${mslg} get endpoints --authoringKey dummy-key --mock`, (error, stdout) => {
                assert(stdout.includes('Operation Succeeded'), stdout);
                let result = JSON.parse(stdout.replace("Operation Succeeded", ""));
                assert.notEqual(result, null);
                assert.equal(result[0].id, "6b371d2c-a0ab-437c-aa8e-1b90c9f66119");
                done();
           });
       });    

   });

    describe('Get Endpoint', function() {

         it('should print the help contents when get endpoint --help is used', function(done) {
             exec(`node ${mslg} get endpoint --help`, (error, stdout) => {
                 assert(stdout.includes('Gets the specified deployed language generation endpoint.'), stdout);
                 assert(stdout.includes('mslg get endpoint --id <string>'), stdout);
                 done();
             });
         });


        it('should get endpoint with specific id', function(done) {
            exec(`node ${mslg} get endpoint --id 007af8d2-8971-4bbf-b8d2-3a4e43e6e6af --mock`, (error, stdout) => {
                assert(stdout.includes('Operation Succeeded'), stdout);
                let result = JSON.parse(stdout.replace("Operation Succeeded", ""));
                assert.notEqual(result, null);
                assert.equal(result.id, "75594bcb-e778-41e7-ae39-2003384c663a");
                done();
            });
        });    

    });

    describe('Delete Endpoint', function() {

        it('should print the help contents when delete endpoint --help is used', function(done) {
            exec(`node ${mslg} delete endpoint --help`, (error, stdout) => {
                assert(stdout.includes('Deletes the language generation model endpoint with the given id.'), stdout);
                assert(stdout.includes('mslg delete endpoint --id <string>'), stdout);
                done();
            });
        });
       
       it('should prompt the user to delete the endpoint first, then proceed with deletion', async () => {
            const mslgProcess = spawn('node', [mslg, 'delete', 'endpoint', '--id', '31f0f91b', '--mock'], {stdio: ['pipe', 'pipe', process.stderr]});
            let msgCt = 0;
            await new Promise(resolve => {
                mslgProcess.stdout.on('data', data => {
                    const message = (msgCt++, data.toString());
                    switch (msgCt) {
                    case 1:
                        assert(message.includes('Are you sure you would like to delete endpoint with id 31f0f91b'));
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

   describe('Update Endpoint', function() {

        it('should print the help contents when update endpoint --help is used', function(done) {
            exec(`node ${mslg} update endpoint --help`, (error, stdout) => {
                assert(stdout.includes('Updates the mutable details of the language generation endpoint identified by its id.'), stdout);
                assert(stdout.includes('mslg update endpoint --in endpointUpdate.json --id <string>'), stdout);
                done();
            });
        });

        it('should fail and print the help contents when update endpoint is used without definition file', function(done) {
            exec(`node ${mslg} update endpoint`, (error, stdout) => {
                assert.equal(stdout, '');
                assert(error.message.includes('The updateEndpoint requires an input of type: EndpointUpdate'), error.message);
                done();
            });
        });

        it('should update endpoint', function(done) {
            exec(`node ${mslg} update endpoint --in TestData/definitions/endpointUpdate.json --id 75563e29-ed9a-47e0-9bbf-a0ab72c9d733 --mock`, (error, stdout) => {
                assert(stdout.includes('Operation Succeeded'), stdout);
                let result = JSON.parse(stdout.replace("Operation Succeeded", ""));
                assert.notEqual(result, null);
                assert.equal(result.id, "75563e29-ed9a-47e0-9bbf-a0ab72c9d733");
                done();
            });
        });
   
    });

});