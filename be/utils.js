const crypto = require('crypto');
const queryString = require('querystring');

function validate(initData, token=process.env.BOT_TOKEN, cStr = "WebAppData") {
  const parsedData = queryString.parse(initData);
  const hashStr = parsedData.hash;
  
  if (!hashStr) {
    throw new Error('Hash parameter is missing in initData');
  }
  delete parsedData.hash;
  const filteredData = Object.keys(parsedData)
    .sort()
    .map(key => `${key}=${parsedData[key]}`)
    .join('\n');
  const secretKey = crypto.createHmac('sha256', cStr)
    .update(token)
    .digest();
  const dataCheck = crypto.createHmac('sha256', secretKey)
    .update(filteredData)
    .digest('hex');


  return dataCheck === hashStr;
}
module.exports = validate;

