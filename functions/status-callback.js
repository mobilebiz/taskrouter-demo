exports.handler = async function (context, event, callback) {
  console.log(`ð status-callback called.`);
  const { TaskSid, CallStatus, ReservationSid } = event;
  const { API_KEY, API_SECRET, ACCOUNT_SID, WORKSPACE_SID } = context;
  const client = require('twilio')(API_KEY, API_SECRET, {
    accountSid: ACCOUNT_SID,
  });
  try {
    if (CallStatus === 'completed') {
      // éè©±ãæ­£å¸¸ã«çµäºãããã¿ã¹ã¯ãå®äºããã
      await client.taskrouter.v1
        .workspaces(WORKSPACE_SID)
        .tasks(TaskSid)
        .update({
          assignmentStatus: 'completed',
        });
    } else {
      // éè©±ãå¤±æããããReservationããªã¸ã§ã¯ããã
      await client.taskrouter.v1
        .workspaces(WORKSPACE_SID)
        .tasks(TaskSid)
        .reservations(ReservationSid)
        .update({
          reservationStatus: 'rejected',
        });
    }
    callback(null, {});
  } catch (err) {
    console.error(`ðº ERROR: ${err.message ? err.message : err}`);
    callback(err);
  }
};
