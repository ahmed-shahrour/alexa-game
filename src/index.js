const Alexa = require('ask-sdk-core');

const {
  LaunchRequestHandler,
  StartGameIntentHandler,
  InProgressGameIntentHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  RepeatIntentHandler,
  InstructionsIntentHandler,
} = require('./handlers');


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
