import { faCoins, faTasks, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/react";

function BottomNav() {
    return (
        <>
            <div className={"absolute fixed bottom-0 w-full flex justify-between gap-2 z-10"} style={{ borderTop: "2px solid #A0937D" }}>
                <div className={"flex-grow flex items-center w-full font-bold"}>
                    <div className={"w-full bg-[#FFFEDF] text-[#03346E] py-4 flex justify-around items-baseline"}>
                        <button className={"items-center gap-1"}>
                            <Link className={"flex flex-col items-center text-black text-sm"} style={{ textDecoration: "none"}} href='/tma/friends/'>
                                <FontAwesomeIcon icon={faUserGroup} color={"black"} size={"sm"}></FontAwesomeIcon>
                                Meows
                            </Link>
                        </button>
                        <button className="items-center gap-1">
                        <Link className={"flex flex-col items-center text-black text-sm"} style={{ textDecoration: "none" }} href="/tma/">
                            <FontAwesomeIcon icon={faCoins} color={"black"}></FontAwesomeIcon>
                            Earn
                        </Link>
                        </button>
                        <button className="items-center gap-1">
                        <Link className={"flex flex-col items-center text-black text-sm"} style={{ textDecoration: "none" }} href="/tma/tasks">
                            <FontAwesomeIcon icon={faTasks} color={"black"}></FontAwesomeIcon>
                            {/* <img src={rocket} width={24} height={24} alt="High Voltage" /> */}
                            <span>Tasks</span></Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BottomNav;