import { Button } from "@nextui-org/react";
import "../App.css";
import "../index.css"
import BottomNav from "../components/BottomNav";

import { initUtils } from '@telegram-apps/sdk';
import WebApp from "@twa-dev/sdk";
import { getReferralsFromId } from "../utils/functions";
import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

function Friends() {

    const utils = initUtils();

    const webAppUser = WebApp.initDataUnsafe.user;

    const userId = webAppUser?.id;

    type User = {
        id: number,
        username: string,
    }
    
    const [totalReferrals, setTotalReferrals] = useState(0);
    const [friends, setFriends] = useState<User[]>([]);

    getReferralsFromId(`${userId}`).then((value) => {
        
        if (value == null || value == "undefined") {
            setTotalReferrals(0);
        } else {
            setTotalReferrals(value.length);
            setFriends(value);
        }
    })

    return (
        <>
            <div className={"bg-[#183153] min-h-screen flex flex-col text-white px-4"}>
                <h3 className={"font-bold text-lg mt-8"}>Invite Friends!</h3>
                <div className={"flex flex-col p-4 my-8 bg-[#001E42] w-full rounded-2xl border-2"} style={{ boxShadow: "0px 3px grey" }}>

                    <div className={"flex flex-col items-center rounded-2xl border-solid mx-4 bg-[#001E42]"}>
                        <p className={"font-bold text-md"}>Referrals</p>
                        <div className={"p-4 m-4 flex flex-row justify-center items-center bg-[#001E42] rounded-2xl border-solid border-2 border-white"}>
                            <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>
                            <p className={"px-4 text-2xl font-bold"}>{`${totalReferrals}`}</p>
                        </div>
                    </div>
                    <div className={"flex flex-row justify-between"}>
                        <Button
                            onClick={() => {
                                utils.shareURL(`https://t.me/my_tma_bot/join?startapp=tmaId${userId}`, "Yahooooooo");
                            }
                            }
                            className={"w-full rounded-lg p-4 mt-4 mx-4 font-bold border-solid border-2 border-white bg-[#001E42]"}
                            style={{ boxShadow: "0px 3px white", color: "white"}}
                            >
                            Share Your Referral Link
                        </Button>
                    </div>
                </div>
                <div>
                    <h3>Friends</h3>
                    <div className={"flex flex-col my-4 list-none"}>
                        {friends.length === 0 ? (<p className={"text-center"}>You have no friends</p>) : friends.map(friend => (
                            <li className={"text-left border-2 border-white rounded-2xl bg-[#001E42] font-bold p-4 my-2"} key={friend.id}>
                                {friend.username}
                            </li>
                        ))}
                    </div>
                </div>
                <BottomNav></BottomNav>
            </div>
        </>
    );
}

export default Friends;