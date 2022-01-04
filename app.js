// modules requires

// dotenv and token
require('dotenv').config();
const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
};

// telegraf and markup
const { Telegraf, Markup } = require('telegraf');

// wordslist
const wordslist = require('./wordslist.json');

// wellcome, info and others text messages
const text = require('./text');

// buttonss
const { startBtn, getBtn } = require('./btn');

// working code
let btnBlock = getBtn([wordslist[0], wordslist[10], wordslist[20], wordslist[30]])
// create new bot
const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply(text.welcome, startBtn)
})
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
