const InstructionsIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'InstructionsIntent'
    );
  },
  handle(handlerInput) {
    const speechText =
      'We\'ll each take turns counting up from one. However, you must replace numbers divisible by 3 with the word "fizz" and you must replace numbers divisible by 5 with the word "buzz". If a number is divisible by both 3 and 5, you should instead say "fizz buzz". If you get one wrong, you lose.';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

module.exports = InstructionsIntentHandler;