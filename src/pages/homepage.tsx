import { useState, useEffect } from "react";
import { Button, CircularProgress } from "@nextui-org/react";
import { addDataToFirestore, getBalanceFromId } from "../utils/functions";

import notcoin from '../assets/notcoin.png';
import WebApp from "@twa-dev/sdk";

import '../App.css'
import '../index.css';
import BottomNav from "../components/BottomNav";

function Homepage() {

    const [boogAmount, setBoogAmount] = useState(0.00000);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [points, setPoints] = useState(0.00000);
    const [isPicking, setIsPicking] = useState(false);
    const [referralCount, setReferralCount] = useState(0);
    const [tasks, setTasks] = useState({
        twitter: false,
        instagram: false,
        telegram: false,
    });

    var i = 90;
    var limit = 99;
    const baseRate = 0.001;
    const pickingRate = baseRate + (referralCount * baseRate);

    const webAppUser = WebApp.initDataUnsafe.user;

    const claimEarnings = async (earnings: number) => {
        setPoints(0.00000);
        setBoogAmount(boogAmount + earnings);
        // await addDataToFirestore("1", "Ocinawa", boogAmount);

        await addDataToFirestore(`${webAppUser?.id}`, `${webAppUser?.username}`, boogAmount + earnings);
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

        if (!loading) {
            getBalanceFromId(`${webAppUser?.id}`).then((value) => {
                if (value !== "" || value !== "undefined") {
                    setBoogAmount(value);
                } else {
                    WebApp.showAlert("Something went wrong, please try again later.")
                }
            })
        }
    }, [])

    useEffect(() => {
        // if (!loading) {

        //     const interval = setInterval(() => {
        //         setPoints((prevPoints) => Math.min(prevPoints + 0.00001, Infinity));
        //     }, 100);

        //     return () => clearInterval(interval);
        // }
        if (!loading) {
            let interval;
            if (isPicking) {
                interval = setInterval(() => {
                    setBoogAmount(prev => Number((prev + pickingRate).toFixed(3)))
                }, 5000);
            }
            // return () => clearInterval(interval);
        }
    }, [isPicking, pickingRate]);

    const taskRewards = (tasks.twitter ? 25 : 0) + 
                     (tasks.instagram ? 25 : 0) + 
                     (tasks.telegram ? 50 : 0);

    return (
        <>
            <div>
                {loading ?
                    <div className={"flex flex-col min-h-screen items-center justify-center"}>
                        <CircularProgress size="lg" value={progress} showValueLabel></CircularProgress>
                        <p className='mt-10 text-center text-lg font-bold'>Loading...</p>
                    </div>
                    :
                    <div className="p-4">

                        <div className="text-center mb-8">
                            <div className={`w-32 h-32 mx-auto bg-green-400 rounded-full mb-4 
                        ${isPicking ? 'animate-bounce' : ''} relative overflow-hidden`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-4xl">🤧</div>
                                </div>
                            </div>
                            <div className="text-2xl font-bold text-green-800">
                                {boogAmount.toFixed(3)} $BOOG
                            </div>
                            <p className="text-sm text-green-600">Picked this session</p>
                        </div>
                        <button
                            onClick={() => setIsPicking(!isPicking)}
                            className={`w-full py-4 rounded-xl font-bold text-white mb-6
                                ${isPicking ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
                                transition-colors`
                            }
                        >
                            <span className="flex items-center justify-center gap-2">
                                {/* <Hand className="w-5 h-5" /> */}
                                {isPicking ? 'Stop Picking' : 'Start Picking'}
                            </span>
                        </button>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-sm text-green-600">Base Rate</p>
                                <p className="text-lg font-bold text-green-800">{baseRate} /5s</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <p className="text-sm text-green-600">Bonus Rate</p>
                                <p className="text-lg font-bold text-green-800">
                                    +{(referralCount * baseRate).toFixed(3)} /5s
                                </p>
                            </div>
                        </div>
                        {/* Quick Stats */}
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                            <div className="flex justify-between mb-2">
                                <span className="text-green-600">Task Rewards</span>
                                <span className="font-bold text-green-800">{taskRewards} $BOOG</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-600">Referral Bonus</span>
                                <span className="font-bold text-green-800">{referralCount}x Rate</span>
                            </div>
                        </div>
                    </div>
                    // Original code
                    // <div className={"bg-gradient-main min-h-screen flex flex-col items-center justify-between text-black"}>
                    //     <div className={"absolute inset-0 h-1/2 bg-gradient-overlay z-0"}></div>
                    //     <div className={"absolute inset-0 flex items-center justify-center z-0"}>
                    //         <div className={'radial-gradient-overlay'}></div>
                    //     </div>

                    //     <div className={"w-full z-10 flex flex-col items-center text-black"}>
                    //         <div className={"fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-black"}>
                    //             <div className={"w-full"}>
                    //                 <p className={"text-sm font-bold"}>Earnings: </p>
                    //             </div>
                    //             <div className="mt-2 text-3xl font-bold flex items-center">
                    //                 <img src={notcoin} width={24} height={24}></img>
                    //                 <span className="ml-2">{points.toFixed(5)}</span>
                    //             </div>
                    //             <div className="text-base mt-2 flex items-center text-sm font-bold">
                    //                 <div onClick={(() => { WebApp.showAlert("YAY") })}>Balance: {boogAmount.toFixed(5)}</div>
                    //             </div>
                    //         </div>
                    //     </div>
                    //     <div className={"flex-grow flex items-center justify-center"}>
                    //         <div className={"relative mt-10"}>
                    //             <img src={notcoin} width={120} height={120} />
                    //         </div>
                    //     </div>
                    //     <div className={"fixed bottom-4 left-0 w-full px-4 pb-16 z-10"}>
                    //         <Button
                    //             disableRipple
                    //             className={"rounded-lg cursor-pointer w-full bg-[#CA3A3A] text-white text-sm font-bold my-4 py-4 border-1 border-black"}
                    //             style={{ boxShadow: "0px 4px black", letterSpacing: "0.35px" }}
                    //             onClick={() => {
                    //                 claimEarnings(points)
                    //             }}
                    //         >
                    //             CLAIM EARNINGS
                    //         </Button>
                    //     </div>
                    //     <BottomNav></BottomNav>
                    // </div>
                }

            </div>
        </>
    );
}

export default Homepage;