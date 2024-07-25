import { Button } from "@nextui-org/react";
import "../App.css";
import "../index.css"
import BottomNav from "../components/BottomNav";

import { initUtils } from '@telegram-apps/sdk';
import WebApp from "@twa-dev/sdk";
import { getReferralsFromId } from "../utils/functions";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faUserGroup } from "@fortawesome/free-solid-svg-icons";

function Friends() {

    const utils = initUtils();

    const webAppUser = WebApp.initDataUnsafe.user;

    const userId = webAppUser?.id;
    // const userId = "1144513351"; //Ocinawa
    // const userId = "2111410917"; //AstroboyIngram

    type User = {
        id: number,
        username: string,
    }

    const [totalReferrals, setTotalReferrals] = useState(0);
    const [friends, setFriends] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            getReferralsFromId(`${userId}`).then((value) => {
                if (value == 0 || value == "undefined") {
                    setTotalReferrals(0);
                    setFriends([]);
                    setLoading(false);
                } else {
                    setTotalReferrals(value);
                    setFriends(value);
                    setLoading(false);
                }
            })
        }
    });


    return (
        <>
            <div className={"bg-[#DFD3C3] min-h-screen flex flex-col text-[#03346E]"}>
                <h3 className={"font-bold text-lg mt-8"}>Invite Friends!</h3>
                <div className={"px-4"}>

                    <div className={"flex flex-col p-4 my-8 bg-[#F8EDE3] w-full rounded-2xl border-2 border-[#A0937D]"}>

                        <div className={"flex flex-col items-center rounded-2xl border-solid py-4 mx-4"}>
                            <p className={"font-bold text-md"}>Referrals</p>
                            <div className={"p-3 m-3 flex flex-row justify-center items-center bg-[#F4CE14] rounded-2xl border-solid border-2 border-[#03346E]"} style={{ boxShadow: "3px 3px #03346E" }}>
                                <FontAwesomeIcon icon={faUserGroup} size={"sm"}></FontAwesomeIcon>
                                <p className={"px-4 text-2xl font-bold"}>{`${totalReferrals}`}</p>
                            </div>
                        </div>
                        <div className={"flex flex-row justify-between"}>
                            <Button
                                onClick={() => {
                                    utils.shareURL(`https://t.me/my_tma_bot/join?startapp=tmaId${userId}`, "Yahooooooo");
                                }
                                }
                                className={"w-full rounded-lg p-4 mt-4 mx-4 font-bold border-solid border-2 border-[#03346E] bg-[#F4CE14] text-[#03346E]"}
                                style={{ boxShadow: "3px 3px #03346E" }}
                            >
                                <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>Share Your Referral Link
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
                </div>
                <BottomNav></BottomNav>
            </div>

        </>
    );
}

export default Friends;