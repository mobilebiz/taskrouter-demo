exports.handler = function (context, event, callback) {
  console.log(`🐞 assignment-callback called.`);
  const { DOMAIN_NAME, TRANSFER_FROM } = context;
  let res = {
    instruction: 'dequeue',
    from: TRANSFER_FROM,
    status_callback_url: `https://${DOMAIN_NAME}/status-callback`,
  };

  callback(null, res);
};
