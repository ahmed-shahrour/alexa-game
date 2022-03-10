const Alexa = require('ask-sdk-core');
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    );
  },
  handle(handlerInput) {
    const speakOutput = 'Welcome to the Alexa Skills Kit, you can say hello!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

