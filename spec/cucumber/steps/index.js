
  
  import superagent from 'superagent';
  import { When, Then } from 'cucumber';

  let request;
  let result = {};
  let error = {};
  let payload = {};

  When('the client creates a POST request to /users', function () {
    request = superagent('POST', 'http://localhost:8080/users');
  });

  When('attaches a generic empty payload', function () {
    return undefined;
    });

    When('sends the request', function (callback) {
      request
      .then((response) => {
        result = response.res;
        callback();
      })
      .catch((errResponse) => {
        error = errResponse.response;
        callback();
      });
    });

    Then('our API should respond with a 400 HTTP status code', function () {
      if (result.statusCode == 200) {
         throw new Error();
      }
    });

    Then('the payload of the response should be a JSON object', function () {
      const response = result || error;
       // Check Content-Type header
       const contentType = response.headers['Content-Type'] ||response.headers['content-type'];

       if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response not of Content-Type application/json');
      }
               
        // Check it is valid JSON
        try {
          payload = JSON.parse(response.text);
        } 
        catch (e) {
          throw new Error('Response not a valid JSON object');
        }
      });



   Then('contains a message property which says "Payload should not be empty"', function
    (callback) {
     callback(null, 'pending');
   });
