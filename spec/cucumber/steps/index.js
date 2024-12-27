
  
  import superagent from 'superagent';
  import { When, Then } from 'cucumber';

  let request;
  let result;
  let error;

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
        return result;
     
      })
      .catch((errResponse) => {
        error = errResponse.response;
        callback();
      });
    });

   Then('our API should respond with a 400 HTTP status code', function ()
   {
    if (error.statusCode !== 400) {
      throw new Error();
    }
  });

   Then('the payload of the response should be a JSON object', function
   (callback) {
   callback(null, 'pending');
   });

   Then('contains a message property which says "Payload should not be empty"', function
    (callback) {
     callback(null, 'pending');
   });
