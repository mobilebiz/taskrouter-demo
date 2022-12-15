exports.handler = async function (context, event, callback) {
  const { TaskSid, CallStatus } = event;
  console.log(`🐞 status-callback called. ${CallStatus}`);
  console.dir(event);
  const { API_KEY, API_SECRET, ACCOUNT_SID, WORKSPACE_SID } = context;
  const client = require('twilio')(API_KEY, API_SECRET, {
    accountSid: ACCOUNT_SID,
  });
  try {
    await client.taskrouter.v1.workspaces(WORKSPACE_SID).tasks(TaskSid).update({
      assignmentStatus: 'completed',
    });
    callback(null, {});
  } catch (err) {
    console.error(`👺 ERROR: ${err.message ? err.message : err}`);
    callback(err);
  }
};
