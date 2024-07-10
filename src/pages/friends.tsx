import { Button } from "@nextui-org/react";
import "../App.css";
import "../index.css"
import BottomNav from "../components/BottomNav";

import { initUtils } from '@telegram-apps/sdk';
import WebApp from "@twa-dev/sdk";
import { getReferralsFromId } from "../utils/functions";
import { useState } from "react";

function Friends() {

    const utils = initUtils();

    const webAppUser = WebApp.initDataUnsafe.user;

    const userId = webAppUser?.id;
    
    const [totalReferrals, setTotalReferrals] = useState(0);

    getReferralsFromId(`${userId}`).then((value) => {
        
        if ((value == null || value == undefined)) {
            setTotalReferrals(0);
        } else {
            setTotalReferrals(value.length);
        }
    })

    return (
        <>
            <div className={"bg-[#212121] min-h-screen flex flex-col items-center text-white px-4"}>
                <div className={"flex flex-col p-4 my-8 bg-[#404040] w-full rounded-lg"} style={{ border: "1px solid black", boxShadow: "0px 3px black" }}>

                    <h3>Invite Friends!</h3>
                    <div className={"flex flex-col items-center rounded-lg border-solid border-1 border-black mt-4 mx-4 bg-[#212121]"}>
                        <p className={"pt-4 font-bold text-lg"}>Referrals</p>
                        <p className={"p-4 m-4 text-2xl font-bold bg-[#404040] rounded-full border-solid border-1 border-black"}>{`${totalReferrals}`}</p>
                    </div>
                    <div className={"flex flex-row justify-between"}>
                        <Button
                            onClick={() => {
                                utils.shareURL(`https://t.me/my_tma_bot?startapp=tmaId${userId}`, "Yahooooooo");
                            }
                            }
                            className={"w-full rounded-lg p-4 mt-4 mx-4 font-bold border-solid border-1 border-black"}>
                            Copy Referral Link
                        </Button>
                    </div>
                </div>
                <BottomNav></BottomNav>
            </div>
        </>
    );
}

export default Friends;