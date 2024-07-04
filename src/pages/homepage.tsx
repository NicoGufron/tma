import { useState, useEffect } from "react";
import { Button, Link, CircularProgress } from "@nextui-org/react";

import notcoin from '../assets/notcoin.png';
import WebApp from "@twa-dev/sdk";

import '../App.css'
import '../index.css';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, setDoc, doc } from 'firebase/firestore';

function Homepage() {

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const [points, setPoints] = useState(0.00000);
    const [balance, setBalance] = useState(0.00000);
    var i = 90;
    var limit = 99;

    WebApp.setHeaderColor('#202020');

    const webAppUser = WebApp.initDataUnsafe.user;
    
    const firebaseConfig = {
        apiKey: "AIzaSyALEGfM6seT7ZKFX7qHBnFaMXzkufMwtb4",
        authDomain: "teleminiapp-1f431.firebaseapp.com",
        projectId: "teleminiapp-1f431",
        storageBucket: "teleminiapp-1f431.appspot.com",
        messagingSenderId: "206057704380",
        appId: "1:206057704380:web:e3b1605006b2868c4139b9",
        measurementId: "G-V78GZWKCMR"
      };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const addUsernametoFirestore = async () => {
        try {
            await setDoc(doc(db, 'users', `tmaId${webAppUser?.id}`), {
                id: webAppUser?.id,
                user: webAppUser?.username,
                totalBalance : balance.toFixed(5),
            });
            WebApp.showAlert("Username added;");
        } catch (e) {
            WebApp.showAlert(`${e}`)
        }
    }

    const getDataFromFirestore = async () => {
        const docRef = doc(db, "users", `tmaId${webAppUser?.id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // setBalance(docSnap.data().balance);
        } else {

        }
    }

    const claimEarnings = (earnings: number) => {
        setPoints(0.00000);
        setBalance(balance + earnings);
    }

    useEffect(() => {
        setLoading(true);

        setInterval(() => {
            if (i <= limit) {
                i += 1;
                setProgress(i);
            } else {
                setTimeout(function () {
                    setLoading(false);
                }, 1000)
            }
        }, 100);

        getDataFromFirestore();
    }, [])

    useEffect(() => {
        if (!loading) {

            const interval = setInterval(() => {
                setPoints((prevPoints) => Math.min(prevPoints + 0.00001, 999999));
            }, 100);

            return () => clearInterval(interval);
        }
    }, [])
    return (
        <>
            <div>
                {loading ?
                    <div className={"flex flex-col min-h-screen items-center justify-center"}>
                        <CircularProgress size="lg" value={progress} showValueLabel></CircularProgress>
                        <p className='mt-10 text-center text-lg'>Loading...</p>
                    </div>
                    :
                    <div className={"bg-gradient-main min-h-screen px-4 flex flex-col items-center justify-between text-white"}>
                        <div className={"absolute inset-0 h-1/2 bg-gradient-overlay z-0"}></div>
                        <div className={"absolute inset-0 flex items-center justify-center z-0"}>
                            <div className={'radial-gradient-overlay'}></div>
                        </div>

                        <div className={"w-full z-10 flex flex-col items-center text-white"}>
                            <div className={"fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white"}>
                                <div className={"w-full"}>
                                    <p className={"text-sm font-bold"}>Earnings: </p>
                                </div>
                                <div className="mt-2 text-4xl font-bold flex items-center">
                                    <img src={notcoin} width={24} height={24}></img>
                                    <span className="ml-2">{points.toFixed(5)}</span>
                                </div>
                                <div className="text-base mt-2 flex items-center text-sm font-bold">
                                    <div onClick={(() => { WebApp.showAlert("YAY") })}>Balance: {balance.toFixed(5)}</div>
                                </div>
                            </div>
                        </div>
                        <div className={"flex-grow flex items-center justify-center"}>
                            <div className={"relative mt-10"}>
                                <img src={notcoin} width={140} height={140} />
                            </div>
                        </div>
                        <div className={"fixed bottom-2 left-0 w-full px-4 pb-4 z-10"}>
                            <Button
                                disableRipple
                                className={"rounded-2xl cursor-pointer w-full bg-[#404040] text-white text-sm font-bold my-4 py-4 h-15"}
                                style={{ border: "1px solid black", boxShadow: "1px 3px black" }}
                                onClick={() => {
                                    addUsernametoFirestore();
                                    claimEarnings(points)
                                }}
                            >
                                CLAIM EARNINGS
                            </Button>
                            <div className={"w-full flex justify-between gap-2"}>
                                <div className={"flex-grow flex items-center w-full text-md font-bold"}>
                                    <div className={"w-full bg-[#404040] py-4 rounded-2xl flex justify-around"} style={{ border: "1px solid black", boxShadow: "1px 3px black" }}>
                                        <button className={"flex flex-col items-center gap-1"}>
                                            <Link style={{textDecoration: "none"}} className={"text-white"} href='/tma/friends/'>Frens</Link>
                                        </button>
                                        <button className="flex flex-col items-center gap-1">
                                            {/* <img src={coin} width={24} height={24} alt="High Voltage" /> */}
                                            <Link style={{textDecoration: "none"}} className={"text-white"} href="/tma/">Earn</Link>
                                        </button>
                                        <button className="flex flex-col items-center gap-1">
                                            {/* <img src={rocket} width={24} height={24} alt="High Voltage" /> */}
                                            <span>Boosts</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    );
}

export default Homepage;