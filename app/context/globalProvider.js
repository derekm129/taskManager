"use client"
import React, { createContext, useState, useContext } from "react";
import { ThemeProvider } from "styled-components";
import themes from "./themes";
import toast from "react-hot-toast";
import axios, { all } from "axios";
import { useUser } from "@clerk/nextjs";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [tasks, setTasks] = useState([]);

    const theme = themes[selectedTheme];

    const allTasks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/app/api/tasks");
            setTasks(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    React.useEffect(() => {
        allTasks();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                theme,
                tasks,
                selectedTheme,
                setSelectedTheme
            }}>
            <GlobalUpdateContext.Provider value={{}}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);