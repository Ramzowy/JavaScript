
  
  import superagent from 'superagent';
  import { When, Then } from 'cucumber';
  import { AssertionError } from 'assert';
  import assert from 'assert';


  let request = {};
  let result = {};
  let error = {};
  let payload = {};

  When(/^the client creates a (GET|POST|PATCH|PUT|DELETE|OPTIONS|HEAD) request to ([/\w-:.]+)$/, function (method, path) 
  {
  this.request = superagent(method,
  `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}${path}`);
  });


 When(/^attaches a generic (.+) payload$/, function (payloadType) {
      switch (payloadType) {
      case 'malformed':
        this.request
        .send('{"email": "dan@danyll.com", name: }')
        .set('Content-Type', 'application/json');
      break;
      case 'non-JSON':
        this.request
        .send('<?xml version="1.0" encoding="UTF-8"?><email>dan@danyll.com</email>')
        .set('Content-Type', 'text/xml');
       break;
       case 'empty':
       default:
        }
      });

      When(/^sends the request$/, function (callback) {
        this.request
        .then((response) => {
          this.response = response.res;
          callback();
        })
        .catch((error) => {
          this.response = error.response;
          callback();
        });
      });

      Then(/^our API should respond with a ([1-5]\d{2}) HTTP status code$/,
        function (statusCode) {
          assert.equal(this.response.statusCode, statusCode);
        });

        Then(/^the payload of the response should be a JSON object$/, function() 
        {
       // Check Content-Type header
       const contentType = this.response.headers['Content-Type'] ||this.response.headers['content-type'];

       if (!contentType || !contentType.includes('application/json')) {  
          throw new Error('Response not of Content-Type application/json');
          }
               
        // Check it is valid JSON
        try {
          this.responsePayload = JSON.parse(this.response.text);
        } catch (e) {
          throw new Error('Response not a valid JSON object');
        }
      });

      Then(/^contains a message property which says (?:"|')(.*)(?:"|')$/, function (message)
       {
          assert.equal(this.responsePayload.message, message);
        });


        // When('attaches a generic non-JSON payload', function () {
        //   this.request.send('<?xml version="1.0" encoding="UTF-8" ?><email>dan@danyll.com</email>');
        //   this.request.set('Content-Type', 'text/xml');
        //   });

        //   When('attaches a generic malformed payload', function () {
        //     this.request.send('{"email": "dan@danyll.com", name: }');
        //     this.request.set('Content-Type', 'application/json');
        //   });
          
        //   Then('our API should respond with a 415 HTTP status code', function ()
        //   {
        //     assert.equal(this.response.statusCode, 415);
        //   });

        //   Then('contains a message property which says \'The "Content-Type" header must always be "application/json"\'', function () {
        //     assert.equal(this.responsePayload.message, 'The "Content-Type header must always be "application/json"');
        //   });

        //   Then('contains a message property which says "Payload should be in JSON format"', function () {
        //     assert.equal(this.responsePayload.message, 'Payload should be in JSON format');
        //   });