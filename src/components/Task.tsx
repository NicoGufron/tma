import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, CircularProgress } from "@nextui-org/react";
import { useState } from "react";

function Task(props : any) {

    const [loading, setLoading] = useState(false);

    return (
        <div className={"flex flex-col border-2 border-solid border-[#A0937D] rounded-lg mt-5"}>
            <div className={"w-full flex flex-row p-2 py-4 justify-between"}>
                <div className={"flex flex-row items-center"}>
                    <FontAwesomeIcon icon={faCheckCircle} color="#CA3A3A" className={"p-2 border-1 border-solid"}></FontAwesomeIcon>
                    <div className={"flex flex-col items-start"}>
                        <p className={"text-md font-medium"} style={{fontSize: "14px"}}>{props.title}</p>
                        <p style={{fontSize: "10px"}}>{props.subtitle}</p>
                    </div>
                </div>
                <div className={"flex flex-row"}>

                    <Button disableRipple
                        className={"rounded-lg cursor-pointer w-full bg-[#CA3A3A] text-white text-sm font-bold border-2 border-solid border-black"}
                        style={{ boxShadow: "0px 4px black", letterSpacing: "0.35px" }}
                        onClick={() => {
                            setLoading(true);
                        }}
                    >
                        {loading ? <CircularProgress color={"default"} size={"sm"}></CircularProgress> : <p>Check</p>}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export { Task };