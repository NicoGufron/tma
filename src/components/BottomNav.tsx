import { Link } from "@nextui-org/react";

function BottomNav() {
    return (
        <>
            <div className={"w-full flex justify-between gap-2"}>
                <div className={"flex-grow flex items-center w-full text-md font-bold"}>
                    <div className={"w-full bg-[#DFD3C3] text-[#03346E] py-4 flex justify-around border-solid border-black border-1"}>
                        <button className={"flex flex-col items-center gap-1"}>
                            <Link style={{ textDecoration: "none" }} href='/tma/friends/'>Frens</Link>
                        </button>
                        <button className="flex flex-col items-center gap-1">
                            {/* <img src={coin} width={24} height={24} alt="High Voltage" /> */}
                            <Link style={{ textDecoration: "none" }} href="/tma/">Earn</Link>
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