import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { Markup, Telegraf } from 'telegraf';
import { getFirestore, setDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

const dotenv = config({ path: "../.env" });

const bot = new Telegraf(process.env.TOKEN_BOT);

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "teleminiapp-1f431.firebaseapp.com",
    projectId: "teleminiapp-1f431",
    storageBucket: "teleminiapp-1f431.appspot.com",
    messagingSenderId: "206057704380",
    appId: "1:206057704380:web:e3b1605006b2868c4139b9",
    measurementId: "G-V78GZWKCMR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const keyboard = Markup.inlineKeyboard([
    [
        Markup.button.webApp('Made with ❤️', 'https://nicogufron.github.io/tma/')
    ]
]);

// dapatin referral dari userid
async function getReferralsFromId(userId) {
    const docRef = doc(db, "referrals", `tmaId${userId}`);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().users;
    } else {
        return 0;
    }
}

// tambahkan referral berdasarkan userid, dan user sekarang
async function addReferral(referralUserId, currentUser) {
    const referralDocRef = doc(db, "referrals", referralUserId);
    const usersDocRef = doc(db, "users", referralUserId);

    let dataReferral = getReferralsFromId(referralUserId);
    console.log(dataReferral);

    if (dataReferral.length > 0) {
        try {
            await setDoc(usersDocRef, {
                users: {
                    id: currentUser.id,
                    username: currentUser.username
                }
            })
        } catch (e) {
            console.log("failed: ", e);
        }
    } else {
        try {
            await setDoc(referralDocRef, {
                users : {
                    id: currentUser.id,
                    username: currentUser.username,
                }
            }).then((value) => {
                console.log("success: ", value);
            })
        } catch (e) {
            console.log("failed: ", e);
        }
    }
}

bot.start((ctx) => {
    const username = ctx.message.username || ctx.chat.username;
    const user = ctx.chat;
    let referralUserId = ctx.payload;

    if (ctx.payload.length > 0 && ctx.payload != "") {
        addReferral(referralUserId, user);
    }

    ctx.replyWithHTML(`Hello @${username}! 👋🏻\n\nWelcome to <b>TMA</b>!\n\nThis bot is only for testing purposes only and does not have any correct functionalities, but you can check the TMA button below.\n\nYou are welcome to message me <b>@Ocinawa</b>`, { parse_mode: 'html', reply_markup: keyboard.reply_markup });
});

bot.on("message", (ctx) => {
    ctx.copyMessage(ctx.message.chat.id, keyboard)
});

bot.launch();