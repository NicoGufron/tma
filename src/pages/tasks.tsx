import "../index.css";
import BottomNav from "../components/BottomNav";
import { useEffect, useState } from "react";
import { Task } from "../components/Task";
import { getTasks } from "../utils/functions";

import stars from '../assets/doodle-stars.png';

import 'doodle.css/doodle.css';

function Tasks() {

    type TaskData = {
        taskId: string,
        title: string,
        subtitle: string,
        rewards: number,
        description: string,
        type: string
    }

    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<TaskData[]>([]);

    /// Buat testing
    // const taskMap = new Map([
    //     ['task1', { title: 'Task 1', subtitle: 'Sub 1', rewards: 10, description: 'Description 1' }],
    //     ['task2', { title: 'Task 2', subtitle: 'Sub 2', rewards: 20, description: 'Description 2' }],
    //     ['task3', { title: 'Task 3', subtitle: 'Sub 3', rewards: 30, description: 'Description 3' }],
    //     ['taskDaily', { title: 'Daily Login', subtitle: '1 LUCKY', rewards: 1, description: 'Description 3' }]
    // ]);


    useEffect(() => {

        /// Buat testing
        /// =============================
        // const taskArray: TaskData[] = Array.from(taskMap.entries()).map(([taskId, taskData]) => ({
        //     taskId,
        //     title: taskData.title,
        //     subtitle: taskData.subtitle,
        //     rewards: taskData.rewards,
        //     description: taskData.description
        // }));

        // setTasks(taskArray);
        /// ==============================

        // / Kode asli
        // / ================================

        const fetchTasks = async () => {
            try {
                const value = await getTasks();
                if (value === 0) {
                    setTasks([]);
                } else {
                    setTasks(value);
                }
            } catch (e) {
                console.error(e);
            } finally {
                console.log("kepanggil lagi ga");
                setLoading(false);
            }
        }

        if (loading) {
            fetchTasks();
        }
        /// =================================
    }, []);

    return (
        <div className={"flex flex-col bg-[#FFFEDF] h-full min-h-screen pt-8"}>
            {/* <div className="mt-8"> */}
                <span className={"flex flex-row items-center justify-center"}>
                    <img src={stars} width={"18"}></img>
                    <h3 className={"px-4 font-bold text-lg"}>Complete Tasks!</h3>
                    <img src={stars} width={"18"}></img>
                </span>
                <div className={"flex flex-col py-4 m-4 overflow-auto"}>
                    <p className={"font-bold text-left text-md"}>Tasks</p>
                    <div className={"h-full pb-16"}>
                        {tasks.length === 0 ? (<p>You have no tasks</p>) : tasks.map(task => (
                            <Task
                                key={task.taskId}
                                title={task.title}
                                taskId={task.taskId}
                                subtitle={task.subtitle}
                                type={task.type}
                                description={task.description}>
                            </Task>
                        ))}
                    </div>
                </div>
            {/* </div> */}
            <BottomNav></BottomNav>
        </div>

    );
}

export default Tasks;