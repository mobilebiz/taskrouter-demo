exports.handler = async function (context, event, callback) {
  console.log(`🐞 wait-url called.`);
  const { DOMAIN_NAME } = context;
  try {
    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    const VoiceResponse = require('twilio').twiml.VoiceResponse;
    const twiml = new VoiceResponse();
    twiml.play(`https://${DOMAIN_NAME}/speech.mp3`);
    response.appendHeader('Content-Type', 'application/xml');
    response.setBody(twiml);
    callback(null, twiml);
  } catch (err) {
    console.error(`👺 ERROR: ${err.message ? err.message : err}`);
    callback(err);
  }
};
