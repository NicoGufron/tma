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

    WebApp.setHeaderColor('#FFFEDF');

    // Disable untuk desktop web
    const utils = initUtils();

    const webAppUser = WebApp.initDataUnsafe.user;

    const userId = webAppUser?.id;
    // const userId = "1144513351"; //Ocinawa
    // const userId = "2111410917"; //AstroboyIngram

    type User = {
        id: number,
        username: string,
        profilePhoto : string,
    }

    const [totalReferrals, setTotalReferrals] = useState(0);
    const [friends, setFriends] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            try {
                getReferralsFromId(`${userId}`).then((value) => {
                    if (value == 0 || value == "undefined") {
                        setTotalReferrals(0);
                        setFriends([]);
                        setLoading(false);
                    } else {
                        setTotalReferrals(value.length);
                        setFriends(value);
                        setLoading(false);
                    }
                })
            } catch (e) {
                WebApp.showAlert("ERROR");
            }
        }
    });


    return (
        <>
            <div className={"bg-[#FFFEDF] min-h-screen flex flex-col text-black"}>
                <h3 className={"font-bold text-lg mt-8"}>Invite Friends!</h3>
                <div className={"px-4"}>

                    <div className={"flex flex-col p-4 my-8 bg-[#F8EDE3] w-full rounded-2xl border-2 border-[#A0937D]"}>

                        <div className={"flex flex-col items-center rounded-lg border-solid py-4 mx-4"}>
                            <p className={"font-bold text-md"}>Referrals</p>
                            <div className={"p-3 m-3 flex flex-row justify-center items-center bg-[#CA3A3A] text-[white] rounded-lg border-solid border-2 border-black"} style={{ boxShadow: "0px 4px black" }}>
                                <FontAwesomeIcon icon={faUserGroup} size={"sm"}></FontAwesomeIcon>
                                <p className={"px-4 text-2xl font-bold"}>{`${totalReferrals}`}</p>
                            </div>
                        </div>
                        <div className={"flex flex-row justify-between"}>
                            <Button
                                onClick={() => {
                                    /// Disable untuk desktop web
                                    utils.shareURL(`https://t.me/my_tma_bot/join?start=tmaId${userId}`, "Yahooooooo");
                                }
                                }
                                className={"w-full rounded-lg p-4 mt-4 mx-4 font-bold border-solid border-2 border-black bg-[#CA3A3A] text-white"}
                                style={{ boxShadow: "0px 4px #000000" }}
                            >
                                <FontAwesomeIcon icon={faShare}></FontAwesomeIcon>Share Your Referral Link
                            </Button>
                        </div>
                    </div>
                    <div className={"flex flex-col items-start"}>
                        <h3 className={"text-lg font-bold"}>List of Meows</h3>
                        <div className={"w-full flex flex-col my-4 list-none"}>
                            {friends.length === 0 ? (<p className={"text-center"}>You have no friends</p>) : friends.map(friend => (
                                <li className={"flex flex-row items-center text-left border-2 border-[#A0937D] rounded-lg bg-[#F8EDE3] font-bold p-4 my-2 text-black"} key={friend.id}>
                                    <img src={friend.profilePhoto} className={"rounded-full mr-4 bg-cover"} width={"50"} height={"50"}/>
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