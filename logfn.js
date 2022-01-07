const fs = require('fs');
function addLog(testObj) {
  let date = new Date();
  let str = `${testObj.userId} - ${testObj.userName} - ${date} \n`;
  fs.appendFile('log.txt', str, err => {
    if (err) console.error(err);
  });
};
module.exports = { addLog };