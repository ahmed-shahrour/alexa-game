const getExpectedResponse = require('../utils/getExpectedResponse');

const RepeatIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'RepeatIntent'
    );
  },
  handle(handlerInput) {
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();

    if (!sessionAttributes.counter) {
      const speechText = "I didn't start yet. Say START to begin.";
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    }
    return handlerInput.responseBuilder
      .speak(`${getExpectedResponse(sessionAttributes.counter)}`)
      .reprompt(`${getExpectedResponse(sessionAttributes.counter)}`)
      .getResponse();
  },
};

module.exports = RepeatIntentHandler;
