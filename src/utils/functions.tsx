import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, setDoc, doc, collection, getDocs, Timestamp, updateDoc, arrayUnion } from 'firebase/firestore';

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

const getTasks = async () => {
    const docRef = collection(db, "tasks");
    const docSnap = await getDocs(docRef);

    if (!docSnap.empty) {
        return docSnap.docs.map(doc => ({
            taskId: doc.data().taskId,
            title : doc.data().title,
            subtitle: doc.data().subtitle,
            rewards: doc.data().rewards,
            description: doc.data().description
        }));
    } else {
        return 0;
    }
}

/// Buat pengecekan hari yang sama
const isSameDay = (timestamp1 : Timestamp, timestamp2 : Timestamp) => {
    const date1 = new Date(timestamp1.seconds * 1000);
    const date2 = new Date(timestamp2.seconds * 1000);

    return date1.toDateString() === date2.toDateString();
}

const dailyCheckIn = async (userId : string) => {
    try {
        const userProgressRef = doc(db, 'userProgress', `tmaId${userId}`);
        const userProgressDoc = await getDoc(userProgressRef);

        const now = Timestamp.now();
        if (!userProgressDoc.exists()) {
            await updateDoc(userProgressRef, {
                completedTasks: arrayUnion("dailyCheckIn"),
                lastCheckIn: now,
                rewards: 1,
            });
            console.log(`User ${userId} has logged in`);
        } else {
            const userProgress = userProgressDoc.data();
            const lastCheckIn = userProgress.lastCheckIn;

            if (lastCheckIn && isSameDay(lastCheckIn, now)) {

                /// TODO harus ubah button jadi disable kalo checkin udah berhasil
                console.log("Already checked in");
                return true;
            }

            await updateDoc(userProgressRef, {
                completedTasks: arrayUnion("dailyCheckIn"),
                lastCheckIn: now,
                rewards: (userProgress.rewards || 0) + 1
            })
            console.log(`User ${userId} has checked in today and earned extra reward`);
        }

    } catch (e) {
        console.log(e);
    }
}

const checkTask = async (taskId : string, userId : string) => {


}

// const checkTaskAndComplete = async (userId: string, taskId : string) => {
//     const docRef = doc(db, "userProgress", `tmaId${userId}`);
// }

export { getBalanceFromId, getTasks, addDataToFirestore, getReferralsFromId, dailyCheckIn }