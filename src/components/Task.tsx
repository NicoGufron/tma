import { useEffect, useState } from "react";

import { Sheet } from 'react-modal-sheet';

import 'doodle.css/doodle.css';

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
        <div className={"flex flex-col rounded-lg mt-5"}>
            <div className={"doodle-border p-2"}>
                <div className={"flex items-center justify-between"}>
                    <div className={"flex flex-col items-start pl-2"}>
                        <p className={"text-md font-bold text-sm"}>{props.title}</p>
                        <p className={"text-green-600 font-bold text-xs"}>{props.subtitle}</p>
                    </div>
                    {props.type === 'social' ? <a href={props.description} target="_blank">
                        <button className={"doodle-border text-xs font-bold"}>{"Follow"}</button>
                    </a> : null}
                    {/* <a href={props.description}>
                        <button className={"doodle-border text-xs font-bold"}>{"Check"}</button>
                    </a> */}
                    {/* <img src={success} className="w-6"></img> */}
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