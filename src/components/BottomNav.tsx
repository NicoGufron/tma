import { Link } from "@nextui-org/react";

// import referrals from '../assets/referrals.png'
import 'doodle.css/doodle.css';

function BottomNav() {
    return (
        <>
            <div className={"absolute bottom-0 w-full flex justify-between gap-2 z-10"} style={{ borderTop: "2px solid #A0937D" }}>
                <div className={"flex-grow flex items-center w-full font-medium"}>
                    <div className={"w-full bg-[#FFFEDF] text-[#03346E] py-4 flex justify-evenly items-baseline"}>
                        <button className={"doodle-border px-2 items-center gap-1"}>
                            <Link className={"flex flex-col gap-2 items-center text-black text-xs"} style={{ textDecoration: "none" }} href='/tma/friends/'>
                                Referrals
                            </Link>
                        </button>
                        <button className="doodle-border px-4 items-center gap-1">
                            <Link className={"flex flex-col gap-2 items-center text-black text-xs"} style={{ textDecoration: "none" }} href="/tma/">
                                Earn
                            </Link>
                        </button>
                        <button className="doodle-border px-4 items-center gap-1">
                            <Link className={"flex flex-col gap-2 items-center text-black text-xs"} style={{ textDecoration: "none" }} href="/tma/tasks">
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