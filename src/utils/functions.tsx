import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "teleminiapp-1f431.firebaseapp.com",
    projectId: "teleminiapp-1f431",
    storageBucket: "teleminiapp-1f431.appspot.com",
    messagingSenderId: "206057704380",
    appId: "1:206057704380:web:e3b1605006b2868c4139b9",
    measurementId: "G-V78GZWKCMR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const addDataToFirestore = async (id : string, username : string, balance : number) => {
    try {
        await setDoc(doc(db, 'users', `tmaId${id}`), {
            id: id,
            user: username,
            totalBalance: balance
        }).then((value) => {
            console.log(value);
        })
    } catch (e) {
        // buat telegram
        // WebApp.showAlert(`${e}`)
        console.log("failed: ", e)
    }
}

const getBalanceFromId = async (id : string) => {
     // const docRef = doc(db, "users", `tmaId${webAppUser?.id}`);
     const docRef = doc(db, "users", `tmaId${id}`);
     const docSnap = await getDoc(docRef);

     if (docSnap.exists()) {
        return docSnap.data().totalBalance;
     } else {
        return 0;
     }
}

const getReferralsFromId = async (id : string) => {
    const referralDocRef = doc(db, "referrals", `tmaId${id}`);
    const docSnap = await getDoc(referralDocRef);

    if (docSnap.exists()) {
        return docSnap.data().users;
    } else {
        return 0;
    }
}

export { getBalanceFromId, addDataToFirestore, getReferralsFromId }