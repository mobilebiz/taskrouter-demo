exports.handler = async function (context, event, callback) {
  console.log(`🐞 wait-url called. ${event.request.headers.host}`);
  const DOMAIN_NAME = event.request.headers.host;
  try {
    const VoiceResponse = require('twilio').twiml.VoiceResponse;
    const response = new VoiceResponse();
    response.play(`https://${DOMAIN_NAME}/speech.mp3`);
    callback(null, response.toString());
  } catch (err) {
    console.error(`👺 ERROR: ${err.message ? err.message : err}`);
    callback(err);
  }
};
