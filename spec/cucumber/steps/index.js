
  
  import superagent from 'superagent';
  import { When, Then } from 'cucumber';

  let request = {};
  let result = {};
  let error = {};
  let payload = {};

  When('the client creates a POST request to /users', function () {
    this.request = superagent('POST', 'localhost:8080/users');
  });

  When('attaches a generic empty payload', function () {
    return undefined;
    });

    When('sends the request', function (callback) {
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

    Then('our API should respond with a 400 HTTP status code', function () {
      if (this.response.statusCode !== 400) {
         throw new Error();
      }
    });

    Then('the payload of the response should be a JSON object', function () {
      const response = result || error;
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

      Then('contains a message property which says "Payload should not beempty"', function () {
        if (this.responsePayload.message !== 'Payload should not be empty')
          {
            throw new Error();
          }
        });
