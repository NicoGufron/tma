import "../index.css";
import BottomNav from "../components/BottomNav";
import { useEffect, useState } from "react";
import { Task } from "../components/Task";
import { getTasks } from "../utils/functions";
import WebApp from "@twa-dev/sdk";

function Tasks() {

    type TaskData = {
        taskId: string,
        title: string,
        subtitle: string,
        rewards: number,
        description: string
    }

    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<TaskData[]>([]);

    useEffect(() => {
        setLoading(true);
        if (loading) {
            getTasks().then((value) => {
                // console.log(value);
                if (value === 0) {
                    setTasks([]);
                } else {
                    setTasks(value);
                }
            }).catch((e) => {
                WebApp.showAlert(e);
            }).finally(() => {
                setLoading(false);
            });
        }
    });

    return (
        <div className={"flex flex-col bg-[#FFFEDF] h-full min-h-screen overflow-y-scroll"}>
            <div>
                <h3 className={"font-bold text-lg"}>Complete Tasks!</h3>
                <div className={"flex flex-col px-4 py-8 m-4 bg-[#F8EDE3] border-2 border-solid border-[#A0937D] rounded-lg"}>
                    <p className={"font-bold text-md"}>Tasks</p>
                    {tasks.length === 0 ? (<p>You have no tasks</p>) : tasks.map(task => (
                        <Task title={task.title} subtitle={task.subtitle}></Task>
                    ))}
                </div>
            </div>
            <BottomNav></BottomNav>
        </div>

    );
}

export default Tasks;