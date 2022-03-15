const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speakOutput = `Sorry, I had trouble understanding what you said. Please repeat your input.`;
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

module.exports = ErrorHandler;