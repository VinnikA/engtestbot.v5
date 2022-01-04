const { Markup } = require('telegraf');
const startBtn = Markup.inlineKeyboard(
  [
    [Markup.button.callback('Start test', 'start_test'), Markup.button.callback('Test info', 'test_info')]
  ]
);
function getBtn(arr) {
  let [a, b, c, d] = arr;
  return Markup.inlineKeyboard(
    [
      [Markup.button.callback(a['ru'], a['eng'])],
      [Markup.button.callback(b['ru'], b['eng'])],
      [Markup.button.callback(c['ru'], c['eng'])],
      [Markup.button.callback(d['ru'], d['eng'])]
    ]
  )
};

module.exports = {
  startBtn,
  getBtn
}