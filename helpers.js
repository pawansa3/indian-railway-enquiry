// Some details about the site
exports.siteName = `Indian Railway`;

exports.errors = [
  { errorCode: 200, errorMsg: 'Success' },
  { errorCode: 210, errorMsg: 'Train doesn’t run on the date queried.' },
  { errorCode: 211, errorMsg: 'Train doesn’t have journey class queried.' },
  { errorCode: 220, errorMsg: 'Flushed PNR.' },
  { errorCode: 221, errorMsg: 'Invalid PNR.' },
  { errorCode: 230, errorMsg: 'Date chosen for the query is not valid for the chosen parameters.' },
  // { errorCode: 404, errorMsg: 'Data couldn’t be loaded on our servers. No data available.' },
  { errorCode: 404, errorMsg: 'No any Result Found.' },
  // { errorCode: 405, errorMsg: 'Data couldn’t be loaded on our servers. Request couldn’t go through.' },
  { errorCode: 405, errorMsg: 'Invalid station name/station code.' },
  { errorCode: 500, errorMsg: 'Unauthorized API Key.' },
  { errorCode: 501, errorMsg: 'Account Expired.' },
  { errorCode: 502, errorMsg: 'Invalid arguments passed.' },
];
