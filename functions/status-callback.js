exports.handler = async function (context, event, callback) {
  console.log(`🐞 status-callback called.`);
  const { TaskSid, CallStatus, ReservationSid } = event;
  const { API_KEY, API_SECRET, ACCOUNT_SID, WORKSPACE_SID } = context;
  const client = require('twilio')(API_KEY, API_SECRET, {
    accountSid: ACCOUNT_SID,
  });
  try {
    if (CallStatus === 'completed') {
      // 通話が正常に終了したらタスクを完了させる
      await client.taskrouter.v1
        .workspaces(WORKSPACE_SID)
        .tasks(TaskSid)
        .update({
          assignmentStatus: 'completed',
        });
    } else {
      // 通話が失敗したら、Reservationをリジェクトする
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
    console.error(`👺 ERROR: ${err.message ? err.message : err}`);
    callback(err);
  }
};
