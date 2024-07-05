import { config } from 'dotenv';
import { Markup, Telegraf } from 'telegraf';

const dotenv = config({path: "../.env"});

const bot = new Telegraf(process.env.TOKEN_BOT);

const keyboard = Markup.inlineKeyboard([
    [
        Markup.button.webApp('Made with ❤️', 'https://nicogufron.github.io/tma/')
    ]
]);

bot.start((ctx) => {
    const username = ctx.message.username || ctx.chat.username;
    ctx.replyWithHTML(`Hello @${username}! 👋🏻\n\nWelcome to <b>TMA</b>!\n\nThis bot is only for testing purposes only and does not have any correct functionalities, but you can check the TMA button below.\n\nYou are welcome to message me <b>@Ocinawa</b>`, {parse_mode: 'html', reply_markup: keyboard.reply_markup});
});

bot.on("message", ctx => ctx.copyMessage(ctx.message.chat.id, keyboard))

bot.launch();