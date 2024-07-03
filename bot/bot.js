import { Telegraf } from 'telegraf';
const TOKEN = "7213033390:AAFfYyiCZwRWSOqUQS2wnu82UXIZau1JMUU";

const bot = new Telegraf(TOKEN);


bot.start((ctx) => {
    const username = ctx.message.username || ctx.chat.username;
    ctx.replyWithHTML(`Hello @${username}! 👋🏻\n\nWelcome to <b>TMA</b>!\n\nThis bot is only for testing purposes only and does not have any correct functionalities, but you can check the TMA button below.\n\nYou are welcome to message me <b>@Ocinawa</b>`);
});

bot.launch();