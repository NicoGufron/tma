import "../index.css";
import BottomNav from "../components/BottomNav";
import { useEffect, useState } from "react";
import { Task } from "../components/Task";
// import { getTasks } from "../utils/functions";
// import WebApp from "@twa-dev/sdk";

function Tasks() {

    type TaskData = {
        taskId: string,
        title: string,
        subtitle: string,
        rewards: number,
        description: string
    }

    // const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<TaskData[]>([]);

    /// Buat testing
    const taskMap = new Map([
        ['task1', { title: 'Task 1', subtitle: 'Sub 1', rewards: 10, description: 'Description 1' }],
        ['task2', { title: 'Task 2', subtitle: 'Sub 2', rewards: 20, description: 'Description 2' }],
        ['task3', { title: 'Task 3', subtitle: 'Sub 3', rewards: 30, description: 'Description 3' }],
        ['taskDaily', { title: 'Daily Login', subtitle: '1 LUCKY', rewards: 1, description: 'Description 3' }]
    ]);


    useEffect(() => {

        /// Buat testing
        /// =============================
        const taskArray: TaskData[] = Array.from(taskMap.entries()).map(([taskId, taskData]) => ({
            taskId,
            title: taskData.title,
            subtitle: taskData.subtitle,
            rewards: taskData.rewards,
            description: taskData.description
        }));

        setTasks(taskArray);
        /// ==============================

        /// Kode asli
        /// ================================
        // const fetchTasks = async () => {
        //     try {
        //         const value = await getTasks();
        //         if (value === 0) {
        //             setTasks([]);
        //         } else {
        //             setTasks(value);
        //         }
        //     } catch (e) {
        //         console.error(e);
        //     } finally {
        //         setLoading(false);
        //     }
        // }
        
        // fetchTasks();
        /// =================================
    }, []);

    return (
        <div className={"flex flex-col bg-[#FFFEDF] h-full min-h-screen overflow-y-scroll"}>
            <div>
                <h3 className={"font-bold text-lg"}>Complete Tasks!</h3>
                <div className={"flex flex-col px-4 py-8 m-4 bg-[#F8EDE3] border-2 border-solid border-[#A0937D] rounded-lg"}>
                    <p className={"font-bold text-md"}>Tasks</p>
                    {tasks.length === 0 ? (<p>You have no tasks</p>) : tasks.map(task => (
                        <Task 
                            key={task.taskId} 
                            title={task.title} 
                            taskId = {task.taskId}
                            // userId = {userId}
                            subtitle={task.subtitle}>
                        </Task>
                    ))}
                </div>
            </div>
            <BottomNav></BottomNav>
        </div>

    );
}

export default Tasks;