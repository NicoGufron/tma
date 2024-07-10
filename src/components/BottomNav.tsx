import { Link } from "@nextui-org/react";

function BottomNav() {
    return (
        <>
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
        </>
    );
}

export default BottomNav;