import { faBoltLightning, faCoins, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@nextui-org/react";

function BottomNav() {
    return (
        <>
            <div className={"absolute fixed bottom-0 w-full flex justify-between gap-2 z-10"} style={{borderTop: "2px solid black"}}>
                <div className={"flex-grow flex items-center w-full font-bold"}>
                    <div className={"w-full bg-transparent text-[#03346E] py-4 flex justify-around items-baseline"}>
                        <button className={"flex flex-col items-center gap-1"}>
                            <FontAwesomeIcon icon={faUserGroup} color={"black"} size={"sm"}></FontAwesomeIcon>
                            <Link className={"text-black text-sm"} style={{ textDecoration: "none" }} href='/tma/friends/'>Meows</Link>
                        </button>
                        <button className="flex flex-col items-center gap-1">
                            <FontAwesomeIcon icon={faCoins} color={"black"}></FontAwesomeIcon>
                            <Link className={"text-black text-sm"} style={{ textDecoration: "none" }} href="/tma/">Earn</Link>
                        </button>
                        <button className="flex flex-col items-center gap-1">
                            <FontAwesomeIcon icon={faBoltLightning} color={"black"}></FontAwesomeIcon>
                            {/* <img src={rocket} width={24} height={24} alt="High Voltage" /> */}
                            <Link className={"text-black text-sm"} style={{ textDecoration: "none"}} href="/tma/"><span>Boosts</span></Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BottomNav;