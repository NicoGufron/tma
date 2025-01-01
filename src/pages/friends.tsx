import { Button } from "@nextui-org/react";
import "../App.css";
// import "../index.css"
import 'doodle.css/doodle.css';
import BottomNav from "../components/BottomNav";

import { initUtils } from '@telegram-apps/sdk';
import WebApp from "@twa-dev/sdk";
import { getReferralsFromId } from "../utils/functions";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare, faUserGroup } from "@fortawesome/free-solid-svg-icons";

import stars from '../assets/doodle-stars.png';
import skull from '../assets/skull.png';

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
            <div className={"friends min-h-screen bg-[#FFFEDF] flex flex-col text-black"}>
                <span className={"flex flex-row items-center justify-center mt-8"}>
                    <img src={stars} width={"18"}></img>
                    <h3 className={"px-4 font-bold text-lg"}>Invite Friends!</h3>
                    <img src={stars} width={"18"}></img>
                </span>
                <div style={{backgroundColor: "#FFFEDF"}} className={"doodle px-4"}>

                    <div className={"doodle-border flex flex-col p-4 my-8 bg-[#F8EDE3] w-full rounded-2xl border-2 border-[#A0937D]"}>

                        <div className={"flex flex-col items-center rounded-lg border-solid py-4 mx-4"}>
                            <p className={"font-bold text-md"}>Referrals</p>
                            <div className={"doodle-border p-3 m-3 flex flex-row justify-center items-center "}>
                                <FontAwesomeIcon icon={faUserGroup} size={"sm"}></FontAwesomeIcon>
                                <p className={"px-4 text-2xl font-bold"}>{`${totalReferrals}`}</p>
                            </div>
                        </div>
                        <div className={"flex flex-row justify-between"}>
                            <Button
                                style={{backgroundColor: "white"}}
                            onClick={() => {
                                    /// Disable untuk desktop web
                                    utils.shareURL(`https://t.me/my_tma_bot?start=tmaId${userId}`, "Yahooooooo");
                                }
                                }
                                className={"w-full rounded-lg font-bold border-solid border-2 border-black text-white"}
                            >
                                <FontAwesomeIcon icon={faShare}></FontAwesomeIcon><p className={"text-xs"}>Share Your Referral Link</p>
                            </Button>
                        </div>
                    </div>
                    <div className={"flex flex-col items-start"}>
                        <h3 className={"text-lg font-bold"}>List of Friends</h3>
                        <div className={"w-full flex flex-col items-center my-2 list-none"}>
                            {friends.length === 0 ? <img style={{border:"none"}} className="w-12 my-5" src={skull}></img> : null} 
                            {friends.length === 0 ? (<p className={"text-center text-md font-bold"}>You have no friends</p>) : friends.map(friend => (
                                <li className={"flex flex-row items-center text-left border-2 border-[#A0937D] rounded-lg bg-[#F8EDE3] font-bold p-4 my-2 text-black"} key={friend.id}>
                                    <img src={friend.profilePhoto} className={"rounded-full mr-4 bg-cover"} width={"40"} height={"40"}/>
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