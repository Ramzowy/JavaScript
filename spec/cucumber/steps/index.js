
  
  import superagent from 'superagent';
  import { When, Then } from 'cucumber';
  
  let request;
  let result;
  let error;
  
  When('the client creates a POST request to /users', function () {
    request = superagent('POST', 'http://localhost:8080/users');
  });
  
  When('attaches a generic empty payload', function () {
    request.send({});  // Send an empty object as the payload
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
    if (result.statusCode !== 400) {
      throw new Error('Expected status code 400 but got ' + result.statusCode);
    }
  });
  
  Then('the payload of the response should be a JSON object', function () {
    if (typeof result.body !== 'object') {
      throw new Error('Response body is not a JSON object');
    }
  });
  
  Then('contains a message property which says "Payload should not be empty"', function () {
    if (result.body.message !== 'Payload should not be empty') {
      throw new Error('Expected message "Payload should not be empty" but got: ' + result.body.message);
    }
  });
  
