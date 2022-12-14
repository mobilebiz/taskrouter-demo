exports.handler = function (context, event, callback) {
  console.log(`🐞 assignment-callback called. ${event.request.headers.host}`);
  const DOMAIN_NAME = event.request.headers.host;
  const { TRANSFER_FROM } = context;
  let res = {
    instruction: 'dequeue',
    from: TRANSFER_FROM,
    status_callback_url: `https://${DOMAIN_NAME}/status-callback`,
  };

  callback(null, res);
};
