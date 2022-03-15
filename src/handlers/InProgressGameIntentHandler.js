const getExpectedResponse = require('../utils/getExpectedResponse');

const InProgressGameIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'InProgressGameIntent'
    );
  },
  handle(handlerInput) {
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.counter += 1;

    const word = Alexa.getSlotValue(handlerInput.requestEnvelope, 'word');
    const number = parseInt(
      Alexa.getSlotValue(handlerInput.requestEnvelope, 'number')
    );
    const expectedRes = getExpectedResponse(sessionAttributes.counter);

    if ((word && expectedRes !== word) || (number && expectedRes !== number)) {
      return handlerInput.responseBuilder
        .speak(
          `Sorry, you said ${
            word || number
          } but I expected ${expectedRes}. You lose! Thanks for playing Fizz Buzz. For another great Alexa game, check out Song Quiz!`
        )
        .withShouldEndSession(true)
        .getResponse();
    }

    sessionAttributes.counter += 1;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(`${getExpectedResponse(sessionAttributes.counter)}`)
      .reprompt(`${getExpectedResponse(sessionAttributes.counter)}`)
      .getResponse();
  },
};

module.exports = InProgressGameIntentHandler;
