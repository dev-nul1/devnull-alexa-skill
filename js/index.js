'use strict';

var Alexa = require('alexa-sdk');
var constants = require('./constants');
var stateHandlers = require('./stateHandlers');
var audioEventHandlers = require('./audioEventHandlers');

Alexa.pre = function(request, response, type) {
  request.applicationId = request.data.session.application.applicationId;
  
  if (request.applicationId != constants.appId) {
    console.log(request);
    console.log('request.applicationId is: ' + request.applicationId);
    //console.log('SKILL_ID is: ' + SKILL_ID);
    // fail ungracefully
    response.fail("Invalid applicationId");
  }
};
//if(event.context && event.context.System.application.applicationId == 'applicationId'){ event.context.System.application.applicationId = event.session.application.applicationId; }

/*
// Define an alexa-app
var alexaApp = new Alexa.app(Config.applicationName);

var appConfig = {
    applicationId: 'amzn1.ask.skill.2e69645e-4d18-4c9c-b9f8-3af525f0da4', // Don't update here, update package.json
    applicationName: 'null-audio',           // Must update this - no spaces, should be a valid identifier (hypens ok)
    functionName: 'null-audio-skill',        // Must update or gulp test-lambda will fail
    description: 'Play great music'
};

// Ensure it is our intended application sending the requests
alexaApp.pre = function (request, response, type) {
    if (request.sessionDetails.application.applicationId !== appConfig.applicationId) {
        // Fail ungracefully
        throw 'Invalid applicationId: ' + request.sessionDetails.application.applicationId;
    }
};



alexaApp.pre = function(request, response, type) {
   if (request.applicationId != "amzn1.ask.skill.2e69645e-4d18-4c9c-b9f8-3af525f0da4") {
     response.fail("Invalid applicationId");
   }
};
*/

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.appId = constants.appId;
    alexa.dynamoDBTableName = constants.dynamoDBTableName;
    alexa.registerHandlers(
        stateHandlers.startModeIntentHandlers,
        stateHandlers.playModeIntentHandlers,
        stateHandlers.remoteControllerHandlers,
        stateHandlers.resumeDecisionModeIntentHandlers,
        audioEventHandlers
    );
    alexa.execute();
};
