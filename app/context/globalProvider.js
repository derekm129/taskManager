"use client"
import React, { createContext, useState, useContext } from "react";
import { ThemeProvider } from "styled-components";
import themes from "./themes";
export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[selectedTheme];
    return (
        <GlobalContext.Provider
            value={{
                theme,
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