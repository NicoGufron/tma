import "../index.css";
import BottomNav from "../components/BottomNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";

function Tasks() {
    return (
        <>
            <div>
                <h3 className={"font-bold text-lg mt-8"}>Complete Tasks!</h3>
                <div className={"flex flex-col items-center py-4 m-4 h-80 bg-[#F8EDE3] border-2 border-solid border-[#A0937D] rounded-lg"}>
                    <p className={"font-bold text-md"}>Tasks</p>

                    <div className={"flex flex-col border-2 border-solid border-[#A0937D] rounded-lg mt-5"}>
                        <div className={"w-full flex flex-row p-4"}>
                            <div className={"flex flex-row items-center justify-between"}>
                                <FontAwesomeIcon icon={faCheckCircle} className={"px-4"}></FontAwesomeIcon>
                                <div className={"flex flex-col items-start"}>
                                    <p className={"text-md"}>Title</p>
                                    <p className={"text-sm"}>Subtitle</p>
                                </div>
                            </div>
                            <Button disableRipple
                                className={"rounded-lg cursor-pointer w-full bg-[#CA3A3A] text-white text-sm font-bold border-2 border-solid border-black"}
                                style={{ boxShadow: "0px 4px black", letterSpacing: "0.35px" }}
                                onClick={() => {

                                }}
                            >
                                Check
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
            <BottomNav></BottomNav>
        </>

    );
}

export default Tasks;