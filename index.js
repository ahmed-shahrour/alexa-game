const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    );
  },
  handle(handlerInput) {
    const speechText =
      'Welcome to Fizz Buzz. We\'ll each take turns counting up from one. However, you must replace numbers divisible by 3 with the word "fizz" and you must replace numbers divisible by 5 with the word "buzz". If a number is divisible by both 3 and 5, you should instead say "fizz buzz". If you get one wrong, you lose. \nSay START to begin the game.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('Say START to begin the game.')
      .getResponse();
  },
};

const StartGameIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'StartGameIntent'
    );
  },
  handle(handlerInput) {
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.counter = 1;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    const speechText = `OK, I'll start... ${sessionAttributes.counter}.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

function getExpectedResponse(counter) {
  if (counter % 3 === 0 && counter % 5 === 0) return 'fizz buzz';
  else if (counter % 3 === 0) return 'fizz';
  else if (counter % 5 === 0) return 'buzz';
  else return counter;
}

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
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'AMAZON.CancelIntent' ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'AMAZON.StopIntent')
    );
  },
  handle(handlerInput) {
    const speakOutput = 'Goodbye!';

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      'SessionEndedRequest'
    );
  },
  handle(handlerInput) {
    // Any clean-up logic goes here.
    return handlerInput.responseBuilder.getResponse();

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

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
