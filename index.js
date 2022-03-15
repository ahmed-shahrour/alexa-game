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

const getExpectedResponse = (counter) => {
  if (counter % 3 === 0 && counter % 5 === 0) return 'fizz buzz';
  else if (counter % 3 === 0) return 'fizz';
  else if (counter % 5 === 0) return 'buzz';
  else return counter;
};

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
    const speakOutput = 'Thanks for playing, that was fun! Goodbye!';

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .withShouldEndSession(true)
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
    StartGameIntentHandler,
    InProgressGameIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    RepeatIntentHandler,
    InstructionsIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();