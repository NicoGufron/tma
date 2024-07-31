import { useState, useEffect } from "react";
import { Button, CircularProgress } from "@nextui-org/react";
import { addDataToFirestore, getBalanceFromId } from "../utils/functions";

import notcoin from '../assets/notcoin.png';
import WebApp from "@twa-dev/sdk";

import '../App.css'
import '../index.css';
import BottomNav from "../components/BottomNav";

function Homepage() {

    const [balance, setBalance] = useState(0.00000);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const [points, setPoints] = useState(0.00000);
    var i = 90;
    var limit = 99;
    

    const webAppUser = WebApp.initDataUnsafe.user;

    const claimEarnings = async (earnings: number) => {
        setPoints(0.00000);
        setBalance(balance + earnings);
        // await addDataToFirestore("1", "Ocinawa", balance);
        
        await addDataToFirestore(`${webAppUser?.id}`, `${webAppUser?.username}`, balance + earnings);
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
                if (value !== "" || value !== "undefined" ) {
                    setBalance(value);  
                } else {
                    WebApp.showAlert("Something went wrong, please try again later.")
                }
            })
        }
    }, [])

    useEffect(() => {
        if (!loading) {

            const interval = setInterval(() => {
                setPoints((prevPoints) => Math.min(prevPoints + 0.00001, 999999));
            }, 100);

            return () => clearInterval(interval);
        }
    }, []);

    return (
        <>
            <div>
                {loading ?
                    <div className={"flex flex-col min-h-screen items-center justify-center"}>
                        <CircularProgress size="lg" value={progress} showValueLabel></CircularProgress>
                        <p className='mt-10 text-center text-lg font-bold'>Loading...</p>
                    </div>
                    :
                    <div className={"bg-gradient-main min-h-screen flex flex-col items-center justify-between text-black"}>
                        <div className={"absolute inset-0 h-1/2 bg-gradient-overlay z-0"}></div>
                        <div className={"absolute inset-0 flex items-center justify-center z-0"}>
                            <div className={'radial-gradient-overlay'}></div>
                        </div>

                        <div className={"w-full z-10 flex flex-col items-center text-black"}>
                            <div className={"fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-black"}>
                                <div className={"w-full"}>
                                    <p className={"text-sm font-bold"}>Earnings: </p>
                                </div>
                                <div className="mt-2 text-3xl font-bold flex items-center">
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
                                <img src={notcoin} width={120} height={120} />
                            </div>
                        </div>
                        <div className={"fixed bottom-4 left-0 w-full px-4 pb-16 z-10"}>
                            <Button
                                disableRipple
                                className={"rounded-lg cursor-pointer w-full bg-[#CA3A3A] text-white text-sm font-bold my-4 py-4 h-15 border-1 border-black"}
                                style={{ boxShadow: "0px 4px black", letterSpacing: "0.35px" }}
                                onClick={() => {
                                    claimEarnings(points)
                                }}
                            >
                                CLAIM EARNINGS
                            </Button>
                        </div>
                        <BottomNav></BottomNav>
                    </div>
                }

            </div>
        </>
    );
}

export default Homepage;