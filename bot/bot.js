import { config } from 'dotenv';
import { initializeApp } from 'firebase/app';
import { Markup, Telegraf } from 'telegraf';
import { getFirestore, setDoc, doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';

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

async function getUserProfilePictureLink(ctx, userId) {
    const userData = await ctx.telegram.getUserProfilePhotos(userId, 0);

    const fileId = userData.photos[0][0].file_id;
    const fileLink = await ctx.telegram.getFileLink(fileId);
    return `${fileLink.href}`;
}

// tambahkan referral berdasarkan userid, dan user sekarang
async function addReferral(ctx, referralUser) {

    const referralUserRef = doc(db, `referrals`, `tmaId${referralUser}`);
    const totalReferrals = await getReferralsFromId(referralUser);
    const profilePhotoLink = await getUserProfilePictureLink(ctx, ctx.chat.id);

    try {

        // ambil referralDoc sesuai tmaId yang di refer
        const referralDoc = await getDoc(doc(db, `referrals`, `tmaId${ctx.chat.id}`));

        // pengecekan data
        if (!referralDoc.exists()) {
            console.log(`No referral found for ${referralUser}`);
        } else {
            const referredUsers = referralDoc.data().users;

            const isAlreadyReferred = referredUsers.some((user) => user.id === parseInt(referralUser));
            if (isAlreadyReferred) {
                return;
            }
        }

        // jika total referrals melebihi dari 1
        if (totalReferrals > 0) {
            // dari firestore, kalau ada data yang sama, ga bakal di add.
            console.log(`#2 Adding referral for ${referralUser}`);
            await updateDoc(referralUserRef, {
                "users": arrayUnion({
                    id: ctx.chat.id,
                    username: ctx.chat.username,
                    profilePhoto: profilePhotoLink
                })
            }, { merge: true }).then(() => console.log("berhasil merge")
            ).catch((e) => {
                console.log("Error arrayUnion: ", e);
            });
            //tambah biasa
        } else {
            console.log(`#1 Adding referral for ${referralUser}`);
            await setDoc(referralUserRef, {
                "users": [{
                    id: ctx.chat.id,
                    username: ctx.chat.username,
                    profilePhoto: profilePhotoLink
                }]
            }).then(() => console.log(`Added referral for ${referralUser}`)).catch((e) => {
                console.log("Error setdoc: ", e);
            })
        }
    } catch (e) {
        console.log("Error addReferral:", e);
    }
}

bot.start((ctx) => {
    const username = ctx.message.username || ctx.chat.username;
    const user = ctx;
    let referralUserId = ctx.payload;

    console.log(ctx.payload);

    if (ctx.payload.length > 0 && ctx.payload != "") {
        referralUserId = referralUserId.substring(5);
        // getUserProfilePictureLink(ctx, ctx.chat.id);
        addReferral(ctx, referralUserId);
    }

    ctx.replyWithHTML(`Hello @${username}! 👋🏻\n\nWelcome to <b>TMA</b>!\n\nThis bot is only for testing purposes only and does not have any correct functionalities, but you can check the TMA button below.\n\nYou are welcome to message me <b>@Ocinawa</b>`, { parse_mode: 'html', reply_markup: keyboard.reply_markup });
});

bot.on("message", (ctx) => {
    ctx.copyMessage(ctx.message.chat.id, keyboard)
});

bot.launch();