// modules requires

// dotenv and token
require('dotenv').config();
const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
};

// telegraf
const { Telegraf } = require('telegraf');

// wordslist
const wordslist = require('./wordslist.json');

// wellcome, info and others text messages
const text = require('./text');

// buttonss
const { startBtn, getBtn } = require('./btn');

// test object class
const { Test } = require('./test');

// work with test object
const { getAnswers, checkAnswer } = require('./supporfunction');

// working code
let btnBlock = getBtn([wordslist[0], wordslist[10], wordslist[20], wordslist[30]])
// create new bot
const bot = new Telegraf(token);
const tests = [];

bot.start((ctx) => {
  ctx.reply(text.welcome, startBtn)
})

bot.action('test_info', async (ctx) => getInfo(ctx));

async function getInfo(ctx) {
  try {
    await ctx.answerCbQuery();
    await ctx.replyWithHTML(text.info, { disable_web_page_preview: true });
    await ctx.reply(text.startTest, startBtn);
  } catch (err) {
    console.error(err);
  }
};

bot.action('start_test', async (ctx) => testStart(ctx));

async function testStart(ctx) {
  try {
    await ctx.answerCbQuery();
    let test = await createTest(ctx.callbackQuery.from.id, ctx.callbackQuery.from.username);
    await getAnswers(wordslist, test);
    await ctx.reply(test.word.eng, getBtn(test.wordsArr));
  } catch (err) {
    console.error(err);
  }
}

function createTest(userId, userName) {
  let test = new Test(userId, userName);
  tests.push(test);
  return test;
}

bot.on('callback_query', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    let id = ctx.callbackQuery.from.id;
    let test = await tests.find(el => el.userId === id);
    if (test.count < 10) {
      let answer = ctx.callbackQuery.data;
      await checkAnswer(answer, test);
      await getAnswers(wordslist, test);
      await ctx.reply(test.word.eng, getBtn(test.wordsArr));
    } else {
      await ctx.reply('Thanks, Big Boobs!');
    }
  } catch (err) {
    console.error(err);
  }
});

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
