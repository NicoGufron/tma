import { Button, Link } from "@nextui-org/react";
import "../App.css";
import "../index.css"

// import { initUtils } from '@tma.js/sdk'; 

// const hash = window.location.hash.slice(1);
// console.log(`Hash: ${hash}`);

// const params = new URLSearchParams(hash);
// console.log(params.get('tgWebAppVersion'));

// const utils = initUtils();

function Friends() {
    return (
        <>
            <div className={"bg-[#212121] min-h-screen flex flex-col items-center text-white px-12"}>
                <div className={"flex flex-col p-4  my-8 bg-[#404040] w-full rounded-lg"} style={{ border: "1px solid black", boxShadow: "0px 3px black" }}>

                    <h3>Invite Friends!</h3>
                    <div className={"flex flex-col items-center rounded-lg border-solid border-1 border-black mt-4 mx-4 bg-[#212121]"}>
                        <p className={"pt-4 font-bold text-lg"}>Referrals</p>
                        <p className={"p-4 m-4 text-2xl font-bold bg-[#404040] rounded-full border-solid border-1 border-black"}>2</p>
                    </div>
                    <div className={"flex flex-row justify-between"}>
                        <Button
                            onClick={() => {
                                // utils.openTelegramLink("https://t.me/share/url?url=https://t.me/my_tma_bot/start?startApp=123")
                            }
                            }
                            className={"w-full rounded-lg p-4 mt-4 mx-4 font-bold border-solid border-1 border-black"}>
                            Copy Referral Link
                        </Button>
                        <Button className={"w-full rounded-lg p-4 mt-4 mx-4 font-bold border-solid border-1 border-black"}>
                            Copy Referral Link
                        </Button>
                    </div>
                </div>
                <div className={"fixed bottom-2 left-0 w-full px-4 pb-4 z-10"}>
                    <div className={"w-full flex justify-between gap-2"}>
                        <div className={"flex-grow flex items-center w-full text-md font-bold"}>
                            <div className={"w-full bg-[#404040] py-4 rounded-2xl flex justify-around"} style={{ border: "1px solid black", boxShadow: "1px 3px black" }}>
                                <button className={"flex flex-col items-center gap-1"}>
                                    <Link style={{ textDecoration: "none" }} className={"text-white"} href='/tma/friends/'>Frens</Link>
                                </button>
                                <button className="flex flex-col items-center gap-1">
                                    {/* <img src={coin} width={24} height={24} alt="High Voltage" /> */}
                                    <Link style={{ textDecoration: "none" }} className={"text-white"} href="/tma/">Earn</Link>
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
        </>
    );
}

export default Friends;