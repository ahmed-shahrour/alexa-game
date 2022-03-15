const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput) {
    const speechText =
      "Choose one of the following options: \n 1. RESTART: Say RESTART to start the game over. \n 2. STOP: Say STOP to end the game. \n 3. REPEAT: Say REPEAT to repeat the last word I said. \n 4. INSTRUCTIONS: Say INSTRUCTIONS to hear the game's instructions again. \n 4. HELP: Say HELP to hear this message again.";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

module.exports = HelpIntentHandler;