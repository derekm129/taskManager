"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
    const { user } = useUser();
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [tasks, setTasks] = useState([]);
    const theme = themes[selectedTheme];

// Modal
    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

// Collapse menu
    const collapseMenu = () => {
        setCollapsed(!collapsed);
    };

// GET all tasks
    const allTasks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/tasks");

            const sorted = res.data.sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            setTasks(sorted);

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    // DELETE
    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`/api/tasks/${id}`);
            toast.success("Task deleted");

            allTasks();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // UPDATE
    const updateTask = async (task) => {
        try {
            const res = await axios.put(`/api/tasks`, task);

            toast.success("Task updated");

            allTasks();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const completedTasks = tasks.filter((task) => task.isCompleted === true);
    const importantTasks = tasks.filter((task) => task.isImportant === true);
    const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

    console.log(tasks);

    // Loader
    // const [isReady, setIsReady] = React.useState(false);
    React.useEffect(() => {
        if (user) allTasks();
    }, [user]);

    // if (!isReady) {
    //     return <div className="w-full h-full flex items-center justify-center">
    //         <span className="loader"></span>
    //     </div>
    // }

    // GLOBAL
    return (
        <GlobalContext.Provider
            value={{
                theme,
                tasks,
                deleteTask,
                isLoading,
                completedTasks,
                importantTasks,
                incompleteTasks,
                updateTask,
                modal,
                openModal,
                closeModal,
                allTasks,
                collapsed,
                collapseMenu,
            }}
        >
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);