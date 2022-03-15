# Alexa Game: Fizz Buzz!

The code is in the `src` folder where you can find the handlers for different intents. In total there are four custom intents with two custom slots for the user answers. The game is simple in the sense that the user has to guess the correct answer and I navigate the intents to correctly answer back and reply.

## Get Started
### Interface
You can find the `intents.json` file that I exported from the developer portal I used to create the required intents and slot types to create the game. Please import it into your delopment portal for the interface.

### Backend
Please compress `src`,  `package.json`, and `node_modules` into a zip file and upload it to Amazon Lambda and connect the endpoint to the interface in the previous step. 

### Start the game
To start the game, say `Alexa, open Fizz Buzz`.