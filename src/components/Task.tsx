import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { Button, CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";
// import { dailyCheckIn } from "../utils/functions";

import { Sheet } from 'react-modal-sheet';

function Task(props : any) {

    const [loading, setLoading] = useState(false);
    const [isOpen, setOpen] = useState(false);
    // const [checkedIn, setCheckedIn] = useState(false);
    // const userId = '2111410917';

    // const handleTask = async (taskId : string, userId : string) => {
    //     console.log(`Handle task clicked: ${taskId}`)
    //     switch (taskId) {
    //         case 'taskDaily':
    //             /// Buat Testing
    //             console.log("Daily task");
    //             dailyCheckIn(userId);
    //             setCheckedIn(true);
    //             setLoading(false);

    //             /// Kode asli
    //             // dailyCheckIn(taskId).then((value) => {
    //             // });
    //             break;
    //         default:
    //             console.log("Misc task");
    //             break;
    //     }
    // }

    useEffect(() => {
        if (loading) {
            setLoading(false);
        }
    }, [])

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

                    {/* <Button disableRipple
                        className={checkedIn === true ? "rounded-lg cursor-pointer w-full bg-[#FAFAFA] text-black text-sm font-bold border-2 border-solid border-black" :  "rounded-lg cursor-pointer w-full bg-[#CA3A3A] text-white text-sm font-bold border-2 border-solid border-black"}
                        style={{ boxShadow: "0px 4px black", letterSpacing: "0.35px" }}
                        onClick={() => {
                            // setLoading(true);
                            setOpen(true);
                            // handleTask(props.taskId, userId);
                        }}
                    >
                        {loading ? <CircularProgress color={"default"} size={"sm"}></CircularProgress> : checkedIn === true ? <p>Claimed</p> : <p>Check</p>}
                    </Button> */}

                    <Sheet 
                        isOpen={isOpen} 
                        onClose={() => setOpen(false)}
                    >
                        <Sheet.Container>
                            <Sheet.Header>
                                <div className={"font-bold text-lg flex flex-row justify-between px-4"}>
                                    <h1>Hello!!</h1>
                                    <button onClick={() => setOpen(false)}>X</button>
                                </div>
                            </Sheet.Header>
                            <Sheet.Content>
                                HAHAHA
                            </Sheet.Content>
                        </Sheet.Container>
                        {/* <Sheet.Backdrop /> */}
                    </Sheet>
                </div>
            </div>
        </div>
    );
}

export { Task };